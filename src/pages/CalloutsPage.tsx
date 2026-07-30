import { MapCard } from "../components/MapCard";
import { PageContainer } from "../components/layout/PageContainer";
import { getMaps } from "../lib/loadLineups";

export default function CalloutsPage() {
  const maps = getMaps();

  return (
    <PageContainer>
      <header className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-50">Calls</h1>
        <p className="text-sm text-gray-400">Elegí un mapa para ver los nombres de sus zonas.</p>
      </header>
      <div className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-3 sm:justify-items-stretch">
        {maps.map((map) => (
          <MapCard key={map.id} map={map} to={`/callouts/${map.id}`} showNadeCounts={false} />
        ))}
      </div>
    </PageContainer>
  );
}
