import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1">
            {index > 0 && <ChevronRight size={14} className="shrink-0 text-gray-400" />}
            {item.to && !isLast ? (
              <Link to={item.to} className="text-gray-300 transition-colors hover:text-accent-hover">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-white" : "text-gray-300"}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
