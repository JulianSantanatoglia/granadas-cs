import { CheckCircle2, ImageOff, Star } from "lucide-react";
import { useState } from "react";
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
  const [imageFailed, setImageFailed] = useState(false);

  const thumbnail =
    lineup.media.kind === "image" ? lineup.media.url : lineup.media.thumbnailUrl;

  return (
    <Link
      to={`/lineup/${lineup.id}`}
      className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 transition-colors hover:border-accent/50 hover:bg-surface-hover"
    >
      {thumbnail && !imageFailed ? (
        <img
          src={thumbnail}
          alt=""
          className="h-14 w-20 shrink-0 rounded-md border border-border object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-md border border-border bg-surface-hover text-gray-600">
          <ImageOff size={16} />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold text-gray-100">
            {lineup.position}
          </span>
          {isFavorite(lineup.id) && (
            <Star size={13} className="shrink-0 fill-gold text-gold" />
          )}
          {isLearned(lineup.id) && (
            <CheckCircle2 size={13} className="shrink-0 text-accent" />
          )}
        </div>
        <span className="truncate text-xs text-gray-500">{subtitle ?? lineup.title}</span>
        <div className="flex gap-2">
          <Badge tone="accent">{lineup.movement}</Badge>
          <Badge tone="neutral">{lineup.technique}</Badge>
        </div>
      </div>
    </Link>
  );
}
