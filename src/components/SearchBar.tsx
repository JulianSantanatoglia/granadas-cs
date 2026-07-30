import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Buscar mapa, zona o posición…" }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-surface px-4 py-3 shadow-md shadow-black/20 transition-colors focus-within:border-accent/50">
      <Search size={16} className="shrink-0 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none"
      />
    </div>
  );
}
