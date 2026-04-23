import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './components/Home';
import SummonerProfile from './components/SummonerProfile';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/summoner/:region/:name" element={<SummonerProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
