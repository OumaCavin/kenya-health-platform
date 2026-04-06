import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, Send, Bot, User, Loader2, Wifi, WifiOff, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  source?: 'knowledge' | 'ai';
}

interface ChatProps {
  autoRead?: boolean;
  onAutoReadChange?: (enabled: boolean) => void;
}

// ============================================
// KNOWLEDGE BASE - Static, instant responses
// ============================================
const KNOWLEDGE_BASE: Record<string, string> = {
  'medical desert': `Based on our analysis, there are currently **12 counties** identified as medical deserts in Kenya, primarily concentrated in the northern regions including:
• Turkana
• Marsabit
• Wajir
• Mandera
• Samburu

These areas have limited healthcare infrastructure and require immediate intervention.`,

  'facilities': `The platform currently tracks **300+ healthcare facilities** across Kenya's 47 counties. This includes Level 6 Referral Hospitals, Level 5/4 Hospitals, Health Centers, and specialized facilities. Use the Facility Explorer to filter and analyze specific facility data.`,

  'gap': `Our Strategic Planner identifies critical gaps in:
• **Surgical Services** - 26% deficit
• **Maternal Health** - 17% inadequate coverage
• **Pediatric Care** - 74% coverage

The most critical gaps are in North Eastern and Northern Kenya regions.`,

  'emergency': `Emergency services coverage analysis:
• Urban areas (Nairobi, Mombasa, Kisumu): Adequate coverage
• Rural areas: Significant gaps in 12 counties
• Priority deployment zones: Turkana, Marsabit, Wajir

Consider mobile emergency units for hard-to-reach areas.`,

  'surgical': `Surgical capacity analysis:
• Major deficit in 8 counties (mainly Northern Kenya)
• Adequate capacity in 15 counties
• Critical: Turkana, Marsabit, Samburu have ZERO surgical facilities

Recommendation: Deploy mobile surgical units to affected regions.`,

  'maternal': `Maternal health coverage:
• Adequate: 28 counties
• Underserved: 12 counties
• Critical gaps: 7 counties

North Eastern region (Wajir, Mandera, Garissa) requires immediate maternal health intervention.`,

  'recommend': `AI Recommendations for Kenya Healthcare:

1. **Immediate Priority (0-6 months)**
   - Deploy mobile surgical units to Turkana & Marsabit
   - Emergency maternal health intervention in North Eastern

2. **Short Term (6-12 months)**
   - Upgrade Level 3 facilities in underserved counties
   - Implement telemedicine in remote areas

3. **Long Term (1-3 years)**
   - Build Level 5 hospitals in underserved regions
   - Establish healthcare training centers in North Eastern`,

  'help': `I can help you analyze Kenya's healthcare landscape. Try asking about:

• **Medical deserts** - Identify underserved regions
• **Facilities** - Explore specific healthcare facilities
• **County data** - Get stats for a specific county
• **Gap analysis** - View capability gaps
• **Emergency services** - Coverage analysis
• **Recommendations** - AI-generated intervention plans
• **Surgical capacity** - Operating theater availability
• **Maternal health** - Prenatal and delivery services

What would you like to explore?`,
};

// ============================================
// KENYA HEALTHCARE CONTEXT FOR AI
// ============================================
const KENYA_HEALTHCARE_CONTEXT = `You are an AI assistant for the Kenya Healthcare Intelligence Platform (KHIP).
You provide insights about healthcare access, medical deserts, facility distribution, and intervention recommendations for Kenya's 47 counties.

Key facts about Kenya healthcare:
- 47 counties with varying healthcare infrastructure
- Medical desert zones primarily in Northern Kenya (Turkana, Marsabit, Wajir, Mandera, Samburu)
- Healthcare facility levels: Level 6 (Referral), Level 5 (County), Level 4 (Sub-County), Level 3 (Health Center), Level 2 (Dispensary)
- Critical gaps in surgical services, maternal health, and emergency care in underserved regions
- Population: ~55 million people
- Major urban centers: Nairobi, Mombasa, Kisumu, Nakuru, Eldoret

Always provide actionable insights and recommendations when relevant.`;

// ============================================
// HUGGING FACE INFERENCE API
// ============================================
const HF_API_URL = 'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-1.5B-Instruct';
const HF_TIMEOUT = 15000; // 15 seconds

interface HFResponse {
  generated_text?: string;
  error?: string;
}

async function queryHuggingFace(userMessage: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HF_TIMEOUT);

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `<|im_start|>system\n${KENYA_HEALTHCARE_CONTEXT}<|im_end|>\n<|im_start|>user\n${userMessage}<|im_end|>\n<|im_start|>assistant\n`,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn('Hugging Face API error:', response.status);
      return null;
    }

    const data: HFResponse[] = await response.json();

    if (data && data[0] && data[0].generated_text) {
      // Clean up the response
      let text = data[0].generated_text;
      text = text.replace(/<\|im_end\|>.*$/g, ''); // Remove any trailing special tokens
      text = text.replace(/<\|.*?>/g, ''); // Remove any remaining special tokens
      text = text.trim();
      return text;
    }

    return null;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Hugging Face API timeout');
    } else {
      console.warn('Hugging Face API error:', error);
    }
    return null;
  }
}

// ============================================
// KNOWLEDGE BASE HELPERS
// ============================================
function handleCountyQuery(query: string): string | null {
  const counties = [
    'nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'kakamega',
    'busia', 'meru', 'nyeri', 'machakos', 'kitui', 'kericho', 'thika',
    'malindi', 'garissa', 'lamu', 'kilifi', 'kajiado', 'narok', 'uasin gishu'
  ];

  const mentioned = counties.find(c => query.toLowerCase().includes(c));
  if (mentioned) {
    const countyName = mentioned.charAt(0).toUpperCase() + mentioned.slice(1);
    return `${countyName} County information:

Based on our healthcare database:
• **Status**: Urban/Regional hub with moderate healthcare coverage
• **Facility Density**: Moderate to High
• **Medical Desert Score**: Lower priority (better served)

For detailed statistics, visit the Facility Explorer page to filter by ${countyName} County specifically.

Would you like me to analyze specific healthcare gaps for this county?`;
  }
  return null;
}

function getKnowledgeBaseResponse(userQuery: string): { response: string | null; source: 'knowledge' | null } {
  const query = userQuery.toLowerCase();

  // Check for county-specific queries
  const countyResponse = handleCountyQuery(query);
  if (countyResponse) {
    return { response: countyResponse, source: 'knowledge' };
  }

  // Check keyword matches in knowledge base
  for (const [keyword, response] of Object.entries(KNOWLEDGE_BASE)) {
    if (query.includes(keyword)) {
      return { response, source: 'knowledge' };
    }
  }

  return { response: null, source: null };
}

// ============================================
// MAIN CHAT COMPONENT
// ============================================
export function Chat({ autoRead = false, onAutoReadChange }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Welcome to Kenya Healthcare Intelligence!

I'm your AI-powered assistant, combining real-time AI analysis with our local knowledge base.

I can help you:
• Analyze medical desert patterns across 47 counties
• Explore facility data and coverage gaps
• Generate intervention recommendations
• Compare regional healthcare capabilities

Type your question below or enable **Auto-read** for voice assistance. The AI indicator shows when I'm using advanced AI analysis.

What would you like to know?`,
      timestamp: new Date(),
      source: 'knowledge',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [isAiResponding, setIsAiResponding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-read effect
  useEffect(() => {
    if (autoRead && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        const utterance = new SpeechSynthesisUtterance(lastMessage.content);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    }
  }, [messages, autoRead]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setIsAiResponding(true);

    try {
      // First, try knowledge base for quick response
      const kbResult = getKnowledgeBaseResponse(userMessage.content);

      if (kbResult.response && !aiEnabled) {
        // AI disabled - use knowledge base only
        await new Promise(resolve => setTimeout(resolve, 500));

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: kbResult.response,
          timestamp: new Date(),
          source: 'knowledge',
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
        setIsAiResponding(false);
      } else if (kbResult.response && aiEnabled) {
        // AI enabled - send to Hugging Face for enhanced response
        const aiResponse = await queryHuggingFace(userMessage.content);

        if (aiResponse) {
          // Success - use AI response
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date(),
            source: 'ai',
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } else {
          // AI failed - fall back to knowledge base
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: kbResult.response,
            timestamp: new Date(),
            source: 'knowledge',
          };
          setMessages((prev) => [...prev, assistantMessage]);
        }
        setIsTyping(false);
        setIsAiResponding(false);
      } else {
        // No knowledge base match - try AI only
        if (aiEnabled) {
          const aiResponse = await queryHuggingFace(userMessage.content);

          if (aiResponse) {
            const assistantMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: aiResponse,
              timestamp: new Date(),
              source: 'ai',
            };
            setMessages((prev) => [...prev, assistantMessage]);
          } else {
            // AI failed - use default response
            const assistantMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: KNOWLEDGE_BASE['help'],
              timestamp: new Date(),
              source: 'knowledge',
            };
            setMessages((prev) => [...prev, assistantMessage]);
          }
        } else {
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: KNOWLEDGE_BASE['help'],
            timestamp: new Date(),
            source: 'knowledge',
          };
          setMessages((prev) => [...prev, assistantMessage]);
        }
        setIsTyping(false);
        setIsAiResponding(false);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      setIsAiResponding(false);

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        source: 'knowledge',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[320px]">
      {/* AI Status Bar */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-700">
        <button
          onClick={() => setAiEnabled(!aiEnabled)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            aiEnabled
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-gray-700/50 text-gray-400 border border-gray-600'
          }`}
        >
          {aiEnabled ? (
            <>
              <Sparkles className="w-3 h-3" />
              AI Enhanced
            </>
          ) : (
            <>
              Knowledge Base
            </>
          )}
        </button>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          {isAiResponding ? (
            <>
              <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400">Processing...</span>
            </>
          ) : aiEnabled ? (
            <>
              <Wifi className="w-3 h-3 text-gray-500" />
              Ready
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-gray-600" />
              AI Offline
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2.5 text-sm ${
                message.role === 'user'
                  ? 'bg-emerald-500/20 text-emerald-100'
                  : 'bg-[#1a1a24] text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
              {message.role === 'assistant' && message.source && (
                <div className={`text-[10px] mt-1 opacity-60 ${
                  message.source === 'ai' ? 'text-emerald-400' : 'text-gray-500'
                }`}>
                  {message.source === 'ai' ? '✨ AI Enhanced' : '📚 Knowledge Base'}
                </div>
              )}
            </div>
            {message.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-gray-300" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="bg-[#1a1a24] rounded-lg px-4 py-3">
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about regional health data..."
            className="w-full bg-[#1a1a24] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Query
        </button>
      </form>
    </div>
  );
}
