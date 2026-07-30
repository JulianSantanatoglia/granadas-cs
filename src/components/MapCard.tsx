import { Bomb, Cloud, Flame, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCountsForMap } from "../lib/loadLineups";
import type { MapMeta, NadeType } from "../types/lineup";

interface MapCardProps {
  map: MapMeta;
  to?: string;
  showNadeCounts?: boolean;
}

const NADE_ICONS: { nadeType: NadeType; icon: typeof Cloud }[] = [
  { nadeType: "smoke", icon: Cloud },
  { nadeType: "molotov", icon: Flame },
  { nadeType: "flash", icon: Zap },
  { nadeType: "he", icon: Bomb },
];

export function MapCard({ map, to, showNadeCounts = true }: MapCardProps) {
  const counts = getCountsForMap(map.id);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link
      to={to ?? `/maps/${map.id}`}
      className="group flex w-full max-w-[90%] flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/50 hover:bg-surface-hover sm:max-w-none"
    >
      {imageFailed ? (
        <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-surface-hover to-bg">
          <span className="text-sm font-semibold text-gray-100 group-hover:text-accent">
            {map.name}
          </span>
        </div>
      ) : (
        <img
          src={map.thumbnail}
          alt={map.name}
          className="aspect-video w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      )}
      {showNadeCounts && (
        <div className="flex items-center gap-2.5 p-3 text-[11px] text-gray-500">
          {NADE_ICONS.map(({ nadeType, icon: Icon }) => (
            <span key={nadeType} className="flex items-center gap-1">
              <Icon size={12} />
              {counts[nadeType]}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
