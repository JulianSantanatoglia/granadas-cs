import { useLocalStorageSet } from "./useLocalStorageSet";

const STORAGE_KEY = "granadas-cs:learned";

export function useLearned() {
  const { ids, has, toggle } = useLocalStorageSet(STORAGE_KEY);
  return { learnedIds: ids, isLearned: has, toggleLearned: toggle };
}
