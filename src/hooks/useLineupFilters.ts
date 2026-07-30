import { useMemo, useState } from "react";
import { getAllLineups, getMap } from "../lib/loadLineups";
import type { Lineup } from "../types/lineup";

export interface LineupSearchResult {
  lineup: Lineup;
  mapName: string;
}

export function useLineupFilters() {
  const [query, setQuery] = useState("");

  const results = useMemo<LineupSearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return getAllLineups()
      .filter((lineup) => {
        const mapName = getMap(lineup.map)?.name ?? lineup.map;
        const haystack = [mapName, lineup.zone, lineup.title, lineup.position]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .map((lineup) => ({ lineup, mapName: getMap(lineup.map)?.name ?? lineup.map }));
  }, [query]);

  return { query, setQuery, results };
}
