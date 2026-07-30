import type { ReactNode } from "react";
import { PageContainer } from "./PageContainer";

interface BackgroundPageProps {
  image?: string;
  children: ReactNode;
}

export function BackgroundPage({ image, children }: BackgroundPageProps) {
  return (
    <div
      className="relative min-h-[calc(100svh-3.5rem-4rem)] bg-cover bg-center bg-no-repeat"
      style={
        image
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(10,11,15,0.93), rgba(10,11,15,0.90) 40%, rgba(10,11,15,0.93) 75%, rgba(10,11,15,0.97)), url(${image})`,
            }
          : undefined
      }
    >
      <PageContainer>
        <div
          style={image ? { textShadow: "0 1px 6px rgba(0,0,0,0.9)" } : undefined}
          className="flex flex-col gap-6"
        >
          {children}
        </div>
      </PageContainer>
    </div>
  );
}
