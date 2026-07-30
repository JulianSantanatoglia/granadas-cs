import { Bomb, ChevronRight, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";
import { PageContainer } from "../components/layout/PageContainer";

export default function HubPage() {
  return (
    <PageContainer>
      <header className="flex flex-col items-center gap-2 py-4 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-50">
          Puro Humo
        </h1>
        <p className="max-w-xs text-sm text-gray-400">
          La app oficial para dejar de tirar humos a la nada. Elegí qué necesitás:
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <Link
          to="/maps"
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface p-5 shadow-md shadow-black/20 transition-all active:scale-[0.98] hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lg hover:shadow-black/30"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-amber-600 text-bg">
            <Bomb size={24} strokeWidth={2.5} />
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-50">Granadas</h2>
            <p className="text-sm text-gray-400">
              Humo, molotov, flash y HE por mapa. Sin excusas.
            </p>
          </div>
          <ChevronRight
            size={20}
            className="shrink-0 text-gray-600 transition-transform group-hover:translate-x-1 group-hover:text-gold"
          />
        </Link>

        <Link
          to="/callouts"
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface p-5 shadow-md shadow-black/20 transition-all active:scale-[0.98] hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-black/30"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-sky-600 text-bg">
            <MapPinned size={24} strokeWidth={2.5} />
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-50">Calls</h2>
            <p className="text-sm text-gray-400">
              Los nombres de cada rincón del mapa, para hablar todos el mismo idioma.
            </p>
          </div>
          <ChevronRight
            size={20}
            className="shrink-0 text-gray-600 transition-transform group-hover:translate-x-1 group-hover:text-accent"
          />
        </Link>
      </div>
    </PageContainer>
  );
}
