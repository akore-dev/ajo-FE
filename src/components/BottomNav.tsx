// src/components/BottomNav.tsx
import { Home, Users, Wallet, SlidersHorizontal } from "lucide-react";
import type { NavRoute } from "../types";

interface BottomNavProps {
  active: NavRoute;
  onNavigate?: (route: NavRoute) => void;
}

const items: { route: NavRoute; label: string; icon: typeof Home }[] = [
  { route: "home", label: "Home", icon: Home },
  { route: "circles", label: "Circles", icon: Users },
  { route: "wallet", label: "Wallet", icon: Wallet },
  { route: "more", label: "More", icon: SlidersHorizontal },
];

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 inset-x-0 flex items-stretch justify-around border-t border-ajo-border bg-white/95 backdrop-blur px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
    >
      {items.map(({ route, label, icon: Icon }) => {
        const isActive = active === route;
        return (
          <button
            key={route}
            type="button"
            onClick={() => onNavigate?.(route)}
            aria-current={isActive ? "page" : undefined}
            className="flex flex-col items-center gap-1 px-4 py-1 rounded-lg"
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2.4 : 1.8}
              className={isActive ? "text-ajo-orange" : "text-ajo-text-faint"}
            />
            <span
              className={[
                "text-[11px] font-sans",
                isActive ? "text-ajo-orange font-semibold" : "text-ajo-text-faint",
              ].join(" ")}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
