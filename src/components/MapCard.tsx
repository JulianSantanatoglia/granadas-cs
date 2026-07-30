import { Bomb, Cloud, Flame, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { getCountsForMap } from "../lib/loadLineups";
import type { MapMeta, NadeType } from "../types/lineup";

interface MapCardProps {
  map: MapMeta;
}

const NADE_ICONS: { nadeType: NadeType; icon: typeof Cloud }[] = [
  { nadeType: "smoke", icon: Cloud },
  { nadeType: "molotov", icon: Flame },
  { nadeType: "flash", icon: Zap },
  { nadeType: "he", icon: Bomb },
];

export function MapCard({ map }: MapCardProps) {
  const counts = getCountsForMap(map.id);

  return (
    <Link
      to={`/maps/${map.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/50 hover:bg-surface-hover"
    >
      <div className="aspect-video w-full bg-gradient-to-br from-surface-hover to-bg" />
      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-sm font-semibold text-gray-100 group-hover:text-accent">
          {map.name}
        </h3>
        <div className="flex items-center gap-2.5 text-[11px] text-gray-500">
          {NADE_ICONS.map(({ nadeType, icon: Icon }) => (
            <span key={nadeType} className="flex items-center gap-1">
              <Icon size={12} />
              {counts[nadeType]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
