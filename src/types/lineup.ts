export type MapId =
  | "dust2"
  | "mirage"
  | "inferno"
  | "nuke"
  | "ancient"
  | "anubis"
  | "vertigo"
  | "overpass"
  | "train";

export type Side = "CT" | "T";
export type NadeType = "smoke" | "molotov" | "flash" | "he";
export type Movement = "stationary" | "walking" | "running" | "jump";
export type Technique = "normal" | "jumpthrow" | "leftclick" | "rightclick";

export interface LineupMedia {
  kind: "video" | "image";
  source: "external" | "upload"; // external = hotlink (ej. csnades.gg), upload = archivo propio en /public/videos
  url: string;
  thumbnailUrl?: string;
}

export interface MapMeta {
  id: MapId;
  name: string;
  order: number;
  thumbnail: string;
}

export interface Lineup {
  id: string; // slug único: "dust2-ct-mid-smoke-back-platform"
  map: MapId;
  side: Side;
  nadeType: NadeType;
  zone: string; // "B Site", "Mid", "Long", etc. — agrupador de la lista de posiciones
  title: string; // "FROM CT Mid"
  position: string; // "Back Platform"
  movement: Movement;
  technique: Technique;
  media: LineupMedia;
  notes?: string;
  learned: boolean;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}
