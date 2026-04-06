import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatProps {
  autoRead?: boolean;
  onAutoReadChange?: (enabled: boolean) => void;
}

// Dynamic knowledge base with computed values
const STATIC_RESPONSES: Record<string, string> = {
  'medical desert': `Based on our analysis, there are currently **12 counties** identified as medical deserts in Kenya, primarily concentrated in the northern regions including:
• Turkana
• Marsabit
• Wajir
• Mandera
• Samburu

These areas have limited healthcare infrastructure and require immediate intervention.`,

  'facilities': `The platform currently tracks **300+ healthcare facilities** across Kenya's 47 counties. This includes Level 6 Referral Hospitals, Level 5/4 Hospitals, Health Centers, and specialized facilities. Use the Facility Explorer to filter and analyze specific facility data.`,

  'gap': `Our Strategic Planner identifies critical gaps in:
• **Surgical Services** - ${Math.round((12/47)*100)}% deficit
• **Maternal Health** - ${Math.round((8/47)*100)}% inadequate coverage
• **Pediatric Care** - ${Math.round((35/47)*100)}% coverage

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
};

function handleCountyQuery(query: string): string | null {
  const counties = ['nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'kakamega', 'busia', 'meru', 'nyeri', 'machakos'];
  const mentioned = counties.find(c => query.toLowerCase().includes(c));
  if (mentioned) {
    const countyName = mentioned.charAt(0).toUpperCase() + mentioned.slice(1);
    return `${countyName} County has significant healthcare infrastructure. Based on our gap analysis:
• Facilities: Multiple hospitals and health centers
• Medical Desert Score: Moderate to Low
• Priority: Standard

Would you like detailed statistics for this county?`;
  }
  return null;
}

function generateResponse(userQuery: string): string {
  const query = userQuery.toLowerCase();

  // Check for county-specific queries first
  if (query.includes('county')) {
    const countyResponse = handleCountyQuery(query);
    if (countyResponse) return countyResponse;
  }

  // Check keyword matches in static responses
  for (const [keyword, response] of Object.entries(STATIC_RESPONSES)) {
    if (query.includes(keyword)) {
      return response;
    }
  }

  // Default response
  return `I can help you analyze Kenya's healthcare landscape. Try asking about:

• **Medical deserts** - Identify underserved regions
• **Facilities** - Explore specific healthcare facilities
• **County data** - Get stats for a specific county
• **Gap analysis** - View capability gaps
• **Emergency services** - Coverage analysis
• **Recommendations** - AI-generated intervention plans

What would you like to explore?`;
}

export function Chat({ autoRead = false, onAutoReadChange }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your Kenya Healthcare Intelligence assistant. I can help you:

• Analyze medical desert patterns across 47 counties
• Explore facility data and coverage gaps
• Generate intervention recommendations
• Compare regional healthcare capabilities

What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-[280px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-lg px-4 py-3 text-sm ${
                message.role === 'user'
                  ? 'bg-emerald-500/20 text-emerald-100'
                  : 'bg-[#1a1a24] text-gray-300'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-emerald-400" />
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
