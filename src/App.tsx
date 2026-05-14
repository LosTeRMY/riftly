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
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/summoner/:region/:name" element={<SummonerProfile />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path="/summoner/:region/:name/champions"
            element={<Champions />}
          />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path="/summoner/:region/:name/lp-graph"
            element={<LPGraph />}
          />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path="/summoner/:region/:name/settings"
            element={<Settings />}
          />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path="/summoner/:region/:name/dashboard"
            element={<Dashboard />}
          />
        </Route>
        <Route element={<MainLayout />}>
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
