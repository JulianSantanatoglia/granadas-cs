import { CheckCircle2, Circle, Star } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { useLearned } from "../hooks/useLearned";
import { describeTitle } from "../lib/format";
import type { Lineup } from "../types/lineup";
import { Badge } from "./Badge";
import { VideoPlayer } from "./VideoPlayer";

interface LineupDetailProps {
  lineup: Lineup;
}

export function LineupDetail({ lineup }: LineupDetailProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isLearned, toggleLearned } = useLearned();
  const favorite = isFavorite(lineup.id);
  const learned = isLearned(lineup.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-50">
            {lineup.position}
          </h1>
          <p className="text-sm text-gray-300">{describeTitle(lineup.title)}</p>
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite(lineup.id)}
          aria-pressed={favorite}
          aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          className={`flex shrink-0 items-center justify-center rounded-full border p-2.5 transition-all active:scale-90 ${
            favorite
              ? "border-gold/50 bg-gold/25 text-gold-hover backdrop-blur-sm"
              : "border-white/20 bg-bg/40 text-gray-200 backdrop-blur-sm hover:bg-surface-hover"
          }`}
        >
          <Star size={18} className={favorite ? "fill-gold" : ""} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-gray-400">
        <Badge tone="neutral">{lineup.map}</Badge>
        <Badge tone="neutral">{lineup.side}</Badge>
        <Badge tone="gold">{lineup.nadeType}</Badge>
        <Badge tone="neutral">{lineup.zone}</Badge>
      </div>

      {lineup.media.kind === "video" ? (
        <VideoPlayer url={lineup.media.url} poster={lineup.media.thumbnailUrl} />
      ) : (
        <img
          src={lineup.media.url}
          alt={`${lineup.title} — ${lineup.position}`}
          className="w-full rounded-2xl border border-white/10 object-cover shadow-md shadow-black/30"
        />
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">Movement: {lineup.movement}</Badge>
        <Badge tone="accent">Technique: {lineup.technique}</Badge>
      </div>

      <button
        type="button"
        onClick={() => toggleLearned(lineup.id)}
        aria-pressed={learned}
        className={`flex items-center gap-2 self-start rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all active:scale-95 ${
          learned
            ? "border-accent/50 bg-accent/25 text-accent-hover backdrop-blur-sm"
            : "border-white/20 bg-bg/40 text-gray-200 backdrop-blur-sm hover:bg-surface-hover"
        }`}
      >
        {learned ? <CheckCircle2 size={16} /> : <Circle size={16} />}
        {learned ? "Aprendida" : "Marcar como aprendida"}
      </button>

      {lineup.notes && (
        <p className="rounded-xl border border-white/10 bg-surface p-3.5 text-sm text-gray-400 shadow-md shadow-black/20">
          {lineup.notes}
        </p>
      )}
    </div>
  );
}
