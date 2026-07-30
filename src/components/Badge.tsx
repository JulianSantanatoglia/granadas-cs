import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "accent" | "gold";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-hover text-gray-200 border-white/10",
  accent: "bg-accent/25 text-accent-hover border-accent/40 backdrop-blur-sm",
  gold: "bg-gold/25 text-gold-hover border-gold/40 backdrop-blur-sm",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
