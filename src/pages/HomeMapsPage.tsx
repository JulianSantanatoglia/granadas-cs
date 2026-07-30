import { MapCard } from "../components/MapCard";
import { PageContainer } from "../components/layout/PageContainer";
import { getMaps } from "../lib/loadLineups";

export default function HomeMapsPage() {
  const maps = getMaps();

  return (
    <PageContainer>
      <header>
        <h1 className="text-2xl font-bold text-gray-100">Granadas CS2</h1>
        <p className="text-sm text-gray-400">Lineups por mapa, sin paywall.</p>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {maps.map((map) => (
          <MapCard key={map.id} map={map} />
        ))}
      </div>
    </PageContainer>
  );
}
