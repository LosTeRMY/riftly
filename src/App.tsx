import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import SummonerProfile from "./components/SummonerProfile";
import Champions from "./components/SummonerProfile/Champions/index";
import LPGraph from "./components/SummonerProfile/LPGraph/index";
import Settings from "./components/SummonerProfile/Settings/index";
import Dashboard from "./components/SummonerProfile/Dashboard/index";
import BareLayout from "./layouts/BareLayout";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import ComingSoon from "./components/ComingSoon";

import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/summoner/:region/:name" element={<SummonerProfile />} />
          <Route path="/summoner/:region/:name/champions" element={<Champions />} />
          <Route path="/summoner/:region/:name/lp-graph" element={<LPGraph />} />
          <Route path="/summoner/:region/:name/settings" element={<Settings />} />
          <Route path="/summoner/:region/:name/dashboard" element={<Dashboard />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Route>
        <Route element={<BareLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
