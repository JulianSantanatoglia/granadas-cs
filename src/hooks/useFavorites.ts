import { useLocalStorageSet } from "./useLocalStorageSet";

const STORAGE_KEY = "granadas-cs:favorites";

export function useFavorites() {
  const { ids, has, toggle } = useLocalStorageSet(STORAGE_KEY);
  return { favoriteIds: ids, isFavorite: has, toggleFavorite: toggle };
}
