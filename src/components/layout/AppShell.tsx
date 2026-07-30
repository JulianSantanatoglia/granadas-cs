import { Bomb, ChevronLeft, House } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHub = location.pathname === "/";

  return (
    <div className="flex min-h-svh flex-col bg-bg">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-3 py-2.5">
          <div className="flex items-center gap-1">
            {!isHub && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Volver"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-surface-hover hover:text-gray-100 active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2 rounded-lg px-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-amber-600 text-bg">
                <Bomb size={16} strokeWidth={2.5} />
              </span>
              <span className="text-base font-extrabold tracking-tight text-gray-50">
                Puro Humo
              </span>
            </Link>
          </div>

          {!isHub && (
            <Link
              to="/"
              aria-label="Ir al inicio"
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-surface-hover hover:text-gray-100 active:scale-95"
            >
              <House size={18} />
            </Link>
          )}
        </div>
      </header>

      <div key={location.pathname} className="flex-1 animate-page-enter pb-16">
        <Outlet />
      </div>

      <BottomNav />
    </div>
  );
}
