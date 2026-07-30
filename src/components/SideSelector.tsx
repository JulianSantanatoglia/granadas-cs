import { Link } from "react-router-dom";
import type { MapId, Side } from "../types/lineup";

interface SideSelectorProps {
  mapId: MapId;
}

const sides: { side: Side; label: string; image: string }[] = [
  { side: "CT", label: "Counter-Terrorist", image: "/images/ct-tt/CT.png" },
  { side: "T", label: "Terrorist", image: "/images/ct-tt/TT.png" },
];

export function SideSelector({ mapId }: SideSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {sides.map(({ side, label, image }) => (
        <Link
          key={side}
          to={`/maps/${mapId}/${side}/smoke`}
          className="overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/50"
        >
          <img src={image} alt={label} className="aspect-video w-full object-cover" />
        </Link>
      ))}
    </div>
  );
}
