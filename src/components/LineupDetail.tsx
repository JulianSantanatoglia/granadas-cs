import { CheckCircle2, Circle, Star } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { useLearned } from "../hooks/useLearned";
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
          <h1 className="text-xl font-bold text-gray-100">{lineup.title}</h1>
          <p className="text-sm text-gray-400">{lineup.position}</p>
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite(lineup.id)}
          aria-pressed={favorite}
          aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          className={`flex shrink-0 items-center justify-center rounded-full border p-2 ${
            favorite
              ? "border-gold/40 bg-gold/10 text-gold"
              : "border-border text-gray-500 hover:bg-surface-hover"
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
        <VideoPlayer url={lineup.media.url} />
      ) : (
        <img
          src={lineup.media.url}
          alt={`${lineup.title} — ${lineup.position}`}
          className="w-full rounded-lg border border-border object-cover"
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
        className={`flex items-center gap-2 self-start rounded-lg border px-3 py-2 text-sm font-medium ${
          learned
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-border text-gray-400 hover:bg-surface-hover"
        }`}
      >
        {learned ? <CheckCircle2 size={16} /> : <Circle size={16} />}
        {learned ? "Aprendida" : "Marcar como aprendida"}
      </button>

      {lineup.notes && (
        <p className="rounded-lg border border-border bg-surface p-3 text-sm text-gray-400">
          {lineup.notes}
        </p>
      )}
    </div>
  );
}
