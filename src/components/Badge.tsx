import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "accent" | "gold";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-hover text-gray-300 border-border",
  accent: "bg-accent/10 text-accent border-accent/30",
  gold: "bg-gold/10 text-gold border-gold/30",
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
