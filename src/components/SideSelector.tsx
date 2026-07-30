import { Link } from "react-router-dom";
import type { MapId, Side } from "../types/lineup";

interface SideSelectorProps {
  mapId: MapId;
}

const sides: { side: Side; label: string; image: string; accent: string }[] = [
  { side: "CT", label: "Counter-Terrorist", image: "/images/ct-tt/CT.png", accent: "hover:border-accent/60" },
  { side: "T", label: "Terrorist", image: "/images/ct-tt/TT.png", accent: "hover:border-gold/60" },
];

export function SideSelector({ mapId }: SideSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {sides.map(({ side, label, image, accent }) => (
        <Link
          key={side}
          to={`/maps/${mapId}/${side}/smoke`}
          className={`overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-md shadow-black/20 transition-all active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 ${accent}`}
        >
          <img src={image} alt={label} className="aspect-video w-full object-cover" />
        </Link>
      ))}
    </div>
  );
}
