import { CheckCircle2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useLearned } from "../hooks/useLearned";
import type { Lineup } from "../types/lineup";
import { Badge } from "./Badge";

interface LineupCardProps {
  lineup: Lineup;
  subtitle?: string;
}

export function LineupCard({ lineup, subtitle }: LineupCardProps) {
  const { isFavorite } = useFavorites();
  const { isLearned } = useLearned();

  return (
    <Link
      to={`/lineup/${lineup.id}`}
      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent/50 hover:bg-surface-hover"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-gray-100">{lineup.position}</span>
          {isFavorite(lineup.id) && <Star size={13} className="fill-gold text-gold" />}
          {isLearned(lineup.id) && <CheckCircle2 size={13} className="text-accent" />}
        </div>
        <span className="text-xs text-gray-500">{subtitle ?? lineup.title}</span>
      </div>
      <div className="flex shrink-0 gap-2">
        <Badge tone="accent">{lineup.movement}</Badge>
        <Badge tone="neutral">{lineup.technique}</Badge>
      </div>
    </Link>
  );
}
