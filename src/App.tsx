import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import SummonerProfile from "./components/SummonerProfile";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative h-screen flex flex-col bg-background text-on-surface">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/summoner/:region/:name" element={<SummonerProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
