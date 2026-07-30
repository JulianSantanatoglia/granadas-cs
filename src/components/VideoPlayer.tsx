import { Pause, Play, Repeat } from "lucide-react";
import { useRef, useState } from "react";

interface VideoPlayerProps {
  url: string;
  poster?: string;
}

const SPEEDS = [0.5, 1, 1.5] as const;
const SKIP_SECONDS = 5;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoPlayer({ url, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [loop, setLoop] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-white/10 bg-surface text-sm text-gray-500">
        No se pudo cargar el video.
      </div>
    );
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function skip(deltaSeconds: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(Math.max(video.currentTime + deltaSeconds, 0), duration || video.duration);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video) return;
    const value = Number(e.target.value);
    video.currentTime = value;
    setCurrentTime(value);
  }

  function setPlaybackSpeed(value: number) {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = value;
    setSpeed(value);
  }

  function toggleLoop() {
    setLoop((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-2">
      <video
        key={url}
        ref={videoRef}
        preload="metadata"
        loop={loop}
        poster={poster}
        className="aspect-video w-full rounded-2xl border border-white/10 bg-black shadow-md shadow-black/30"
        onError={() => setFailed(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => {
          const video = e.currentTarget;
          setDuration(video.duration);
          // Sin poster propio: forzar un seek mínimo para que el navegador
          // pinte el primer frame como miniatura en vez de dejarlo en negro.
          if (!poster && video.currentTime === 0) {
            video.currentTime = Math.min(0.1, video.duration || 0.1);
          }
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onClick={togglePlay}
      >
        <source src={url} />
      </video>

      <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-surface p-3 shadow-md shadow-black/20">
        <div className="flex items-center gap-2">
          <span className="w-10 shrink-0 text-right text-xs tabular-nums text-gray-400">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={currentTime}
            onChange={handleSeek}
            className="h-1.5 w-full flex-1 cursor-pointer accent-accent"
            aria-label="Posición del video"
          />
          <span className="w-10 shrink-0 text-xs tabular-nums text-gray-400">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => skip(-SKIP_SECONDS)}
              className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-gray-300 transition-all active:scale-95 hover:bg-surface-hover"
            >
              -{SKIP_SECONDS}s
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center justify-center rounded-full border border-accent/40 bg-accent/15 p-2.5 text-accent transition-all active:scale-90 hover:bg-accent/25"
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              type="button"
              onClick={() => skip(SKIP_SECONDS)}
              className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-gray-300 transition-all active:scale-95 hover:bg-surface-hover"
            >
              +{SKIP_SECONDS}s
            </button>
          </div>

          <div className="flex items-center gap-1">
            {SPEEDS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setPlaybackSpeed(value)}
                className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                  speed === value
                    ? "border-gold/50 bg-gold/15 text-gold"
                    : "border-border text-gray-400 hover:bg-surface-hover"
                }`}
              >
                {value}x
              </button>
            ))}
            <button
              type="button"
              onClick={toggleLoop}
              aria-pressed={loop}
              aria-label="Repetir"
              className={`flex items-center justify-center rounded-full border p-2 transition-all active:scale-90 ${
                loop
                  ? "border-gold/50 bg-gold/15 text-gold"
                  : "border-border text-gray-400 hover:bg-surface-hover"
              }`}
            >
              <Repeat size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
