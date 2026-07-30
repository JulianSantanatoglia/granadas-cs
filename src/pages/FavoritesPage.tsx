import { LineupCard } from "../components/LineupCard";
import { PageContainer } from "../components/layout/PageContainer";
import { useFavorites } from "../hooks/useFavorites";
import { getLineup, getMap } from "../lib/loadLineups";

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const favorites = favoriteIds
    .map((id) => getLineup(id))
    .filter((lineup) => lineup !== undefined);

  return (
    <PageContainer>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-50">Favoritos</h1>
        <p className="text-sm text-gray-400">Tus lineups guardados.</p>
      </div>

      {favorites.length === 0 ? (
        <p className="text-sm text-gray-500">
          Todavía no marcaste ningún lineup como favorito. Tocá la estrella en el detalle de un
          lineup para guardarlo acá.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {favorites.map((lineup) => (
            <LineupCard
              key={lineup.id}
              lineup={lineup}
              subtitle={`${getMap(lineup.map)?.name ?? lineup.map} · ${lineup.side} · ${lineup.nadeType} · ${lineup.zone}`}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
