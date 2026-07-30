import mapsData from "../data/maps.json";
import dust2 from "../data/lineups/dust2.json";
import inferno from "../data/lineups/inferno.json";
import mirage from "../data/lineups/mirage.json";
import type { Lineup, MapId, MapMeta, NadeType, Side } from "../types/lineup";

const lineupsByMap: Record<MapId, Lineup[]> = {
  dust2: dust2 as Lineup[],
  mirage: mirage as Lineup[],
  inferno: inferno as Lineup[],
  nuke: [],
  ancient: [],
  anubis: [],
  vertigo: [],
  overpass: [],
  train: [],
};

export function getMaps(): MapMeta[] {
  return [...(mapsData as MapMeta[])].sort((a, b) => a.order - b.order);
}

export function getMap(mapId: MapId): MapMeta | undefined {
  return getMaps().find((m) => m.id === mapId);
}

const MAP_BACKGROUNDS: Partial<Record<MapId, string>> = {
  dust2: "/images/background/dust2.avif",
  mirage: "/images/background/mirage.jpg",
  inferno: "/images/background/inferno.jpg",
  nuke: "/images/background/nuke.jpg",
  ancient: "/images/background/ancient.jpg",
};

export function getMapBackground(mapId: MapId): string | undefined {
  return MAP_BACKGROUNDS[mapId];
}

export function getLineupsForMap(mapId: MapId): Lineup[] {
  return lineupsByMap[mapId] ?? [];
}

export function getLineups(mapId: MapId, side: Side, nadeType: NadeType): Lineup[] {
  return getLineupsForMap(mapId).filter(
    (l) => l.side === side && l.nadeType === nadeType,
  );
}

export function getLineup(id: string): Lineup | undefined {
  return Object.values(lineupsByMap)
    .flat()
    .find((l) => l.id === id);
}

export function getAllLineups(): Lineup[] {
  return Object.values(lineupsByMap).flat();
}

const NADE_TYPES: NadeType[] = ["smoke", "molotov", "flash", "he"];

export const NADE_TYPE_LABELS: Record<NadeType, string> = {
  smoke: "Smoke",
  molotov: "Molotov",
  flash: "Flash",
  he: "HE",
};

export function getCountsForMap(mapId: MapId): Record<NadeType, number> {
  const lineups = getLineupsForMap(mapId);
  const counts = {} as Record<NadeType, number>;
  for (const nadeType of NADE_TYPES) {
    counts[nadeType] = lineups.filter((l) => l.nadeType === nadeType).length;
  }
  return counts;
}

export interface ZoneGroup {
  zone: string;
  lineups: Lineup[];
}

export function groupByZone(lineups: Lineup[]): ZoneGroup[] {
  const zones = new Map<string, Lineup[]>();
  for (const lineup of lineups) {
    const group = zones.get(lineup.zone) ?? [];
    group.push(lineup);
    zones.set(lineup.zone, group);
  }
  return [...zones.entries()].map(([zone, groupLineups]) => ({ zone, lineups: groupLineups }));
}
