import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import CalloutDetailPage from "./pages/CalloutDetailPage";
import CalloutsPage from "./pages/CalloutsPage";
import FavoritesPage from "./pages/FavoritesPage";
import HomeMapsPage from "./pages/HomeMapsPage";
import HubPage from "./pages/HubPage";
import LineupDetailPage from "./pages/LineupDetailPage";
import NadeTypePage from "./pages/NadeTypePage";
import SearchPage from "./pages/SearchPage";
import TeamPage from "./pages/TeamPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HubPage />} />
          <Route path="/maps" element={<HomeMapsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/callouts" element={<CalloutsPage />} />
          <Route path="/callouts/:mapId" element={<CalloutDetailPage />} />
          <Route path="/maps/:mapId" element={<TeamPage />} />
          <Route path="/maps/:mapId/:side" element={<NadeTypePage />} />
          <Route path="/maps/:mapId/:side/:nadeType" element={<NadeTypePage />} />
          <Route path="/lineup/:lineupId" element={<LineupDetailPage />} />
          <Route path="*" element={<HubPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
