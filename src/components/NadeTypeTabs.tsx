import { Link } from "react-router-dom";
import { Bomb, Cloud, Flame, Zap } from "lucide-react";
import type { MapId, NadeType, Side } from "../types/lineup";

interface NadeTypeTabsProps {
  mapId: MapId;
  side: Side;
  active: NadeType;
}

const tabs: { nadeType: NadeType; label: string; icon: typeof Cloud }[] = [
  { nadeType: "smoke", label: "Smoke", icon: Cloud },
  { nadeType: "molotov", label: "Molotov", icon: Flame },
  { nadeType: "flash", label: "Flash", icon: Zap },
  { nadeType: "he", label: "HE", icon: Bomb },
];

export function NadeTypeTabs({ mapId, side, active }: NadeTypeTabsProps) {
  return (
    <div className="flex min-w-0 gap-2 overflow-x-auto">
      {tabs.map(({ nadeType, label, icon: Icon }) => {
        const isActive = nadeType === active;
        return (
          <Link
            key={nadeType}
            to={`/maps/${mapId}/${side}/${nadeType}`}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
              isActive
                ? "border-gold/50 bg-gold/15 text-gold shadow-sm shadow-gold/10"
                : "border-border bg-surface text-gray-400 hover:border-border hover:bg-surface-hover hover:text-gray-200"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
