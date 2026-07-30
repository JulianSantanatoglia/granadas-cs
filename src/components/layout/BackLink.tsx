import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BackLinkProps {
  to: string;
  label: string;
}

export function BackLink({ to, label }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-accent"
    >
      <ChevronLeft size={16} />
      {label}
    </Link>
  );
}
