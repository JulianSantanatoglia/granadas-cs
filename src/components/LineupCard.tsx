import { CheckCircle2, ImageOff, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useLearned } from "../hooks/useLearned";
import { describeTitle } from "../lib/format";
import type { Lineup } from "../types/lineup";

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
  const favorite = isFavorite(lineup.id);
  const learned = isLearned(lineup.id);

  return (
    <Link
      to={`/lineup/${lineup.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-md shadow-black/20 transition-all active:scale-[0.98] hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-black/30"
    >
      <div className="relative">
        {thumbnail && !imageFailed ? (
          <img
            src={thumbnail}
            alt=""
            className="aspect-video w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-surface-hover text-gray-600">
            <ImageOff size={22} />
          </div>
        )}
        {(favorite || learned) && (
          <div className="absolute right-2 top-2 flex gap-1.5">
            {favorite && (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur">
                <Star size={14} className="fill-gold text-gold" />
              </span>
            )}
            {learned && (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur">
                <CheckCircle2 size={14} className="text-accent" />
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 p-3">
        <span className="truncate text-sm font-bold text-gray-50">{lineup.position}</span>
        <span className="truncate text-xs text-gray-400">
          {subtitle ?? describeTitle(lineup.title)}
        </span>
      </div>
    </Link>
  );
}
