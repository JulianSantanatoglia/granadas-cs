import { Bomb } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function AppShell() {
  return (
    <div className="flex min-h-svh flex-col bg-bg">
      <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <Bomb size={18} className="text-gold" />
            <span className="text-sm font-bold tracking-tight text-gray-100">
              Granadas CS2
            </span>
          </Link>
        </div>
      </header>

      <div className="flex-1 pb-16">
        <Outlet />
      </div>

      <BottomNav />
    </div>
  );
}
