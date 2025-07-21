import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';
import Inbox from './Pages/Inbox';
import Compose from './Pages/Compose';
import Leaderboard from './Pages/Leaderboard';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />  {/* Redirect */}
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}