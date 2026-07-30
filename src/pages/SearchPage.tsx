import { LineupCard } from "../components/LineupCard";
import { SearchBar } from "../components/SearchBar";
import { PageContainer } from "../components/layout/PageContainer";
import { useLineupFilters } from "../hooks/useLineupFilters";

export default function SearchPage() {
  const { query, setQuery, results } = useLineupFilters();

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-gray-100">Buscar</h1>
      <SearchBar value={query} onChange={setQuery} />

      {query.trim() === "" ? (
        <p className="text-sm text-gray-500">
          Escribí un mapa, una zona o una posición para buscar.
        </p>
      ) : results.length === 0 ? (
        <p className="text-sm text-gray-500">Sin resultados para "{query}".</p>
      ) : (
        <div className="flex flex-col gap-2">
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
