import { Bomb, Heart, Map, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  icon: typeof Bomb;
}

const items: NavItem[] = [
  { to: "/", label: "Granadas", icon: Bomb },
  { to: "/callouts", label: "Mapas", icon: Map },
  { to: "/search", label: "Buscar", icon: Search },
  { to: "/favorites", label: "Favoritos", icon: Heart },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-3xl">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                isActive ? "text-gold" : "text-gray-500 hover:text-gray-300"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
