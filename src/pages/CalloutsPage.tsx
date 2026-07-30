import { MapCard } from "../components/MapCard";
import { PageContainer } from "../components/layout/PageContainer";
import { getMaps } from "../lib/loadLineups";

export default function CalloutsPage() {
  const maps = getMaps();

  return (
    <PageContainer>
      <header>
        <h1 className="text-2xl font-bold text-gray-100">Mapas</h1>
        <p className="text-sm text-gray-400">Nombres de zonas por mapa.</p>
      </header>
      <div className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-3 sm:justify-items-stretch">
        {maps.map((map) => (
          <MapCard key={map.id} map={map} to={`/callouts/${map.id}`} showNadeCounts={false} />
        ))}
      </div>
    </PageContainer>
  );
}
