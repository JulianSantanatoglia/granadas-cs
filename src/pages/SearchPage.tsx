import { LineupCard } from "../components/LineupCard";
import { SearchBar } from "../components/SearchBar";
import { PageContainer } from "../components/layout/PageContainer";
import { useLineupFilters } from "../hooks/useLineupFilters";

export default function SearchPage() {
  const { query, setQuery, results } = useLineupFilters();

  return (
    <PageContainer>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-50">Buscar</h1>
        <p className="text-sm text-gray-400">Por mapa, zona o posición.</p>
      </div>
      <SearchBar value={query} onChange={setQuery} />

      {query.trim() === "" ? (
        <p className="text-sm text-gray-500">
          Escribí un mapa, una zona o una posición para buscar.
        </p>
      ) : results.length === 0 ? (
        <p className="text-sm text-gray-500">Sin resultados para "{query}".</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {results.map(({ lineup, mapName }) => (
            <LineupCard
              key={lineup.id}
              lineup={lineup}
              subtitle={`${mapName} · ${lineup.side} · ${lineup.nadeType} · ${lineup.zone}`}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
