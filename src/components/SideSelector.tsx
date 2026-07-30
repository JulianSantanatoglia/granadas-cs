import { Link } from "react-router-dom";
import type { MapId, Side } from "../types/lineup";

interface SideSelectorProps {
  mapId: MapId;
}

const sides: { side: Side; label: string }[] = [
  { side: "CT", label: "Counter-Terrorist" },
  { side: "T", label: "Terrorist" },
];

export function SideSelector({ mapId }: SideSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {sides.map(({ side, label }) => (
        <Link
          key={side}
          to={`/maps/${mapId}/${side}/smoke`}
          className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface p-6 text-center transition-colors hover:border-accent/50 hover:bg-surface-hover"
        >
          <span className="text-2xl font-bold text-gray-100">{side}</span>
          <span className="text-sm text-gray-400">{label}</span>
        </Link>
      ))}
    </div>
  );
}
