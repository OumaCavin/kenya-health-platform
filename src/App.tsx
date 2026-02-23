import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CommandCenter } from './pages/CommandCenter';
import { IDPAgent } from './pages/IDPAgent';
import { StrategicPlanner } from './pages/StrategicPlanner';
import { FacilityExplorer } from './pages/FacilityExplorer';
import { DataIntegrity } from './pages/DataIntegrity';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommandCenter />} />
        <Route path="/idp" element={<IDPAgent />} />
        <Route path="/planner" element={<StrategicPlanner />} />
        <Route path="/explorer" element={<FacilityExplorer />} />
        <Route path="/data-integrity" element={<DataIntegrity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
