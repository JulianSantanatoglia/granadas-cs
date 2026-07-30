import type { ZoneGroup } from "../lib/loadLineups";
import { LineupCard } from "./LineupCard";

interface ZoneListProps {
  zones: ZoneGroup[];
}

export function ZoneList({ zones }: ZoneListProps) {
  if (zones.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-gray-500">
        Todavía no hay lineups cargados para esta combinación.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {zones.map(({ zone, lineups }) => (
        <div key={zone} className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {zone}
          </h3>
          <div className="flex flex-col gap-2">
            {lineups.map((lineup) => (
              <LineupCard key={lineup.id} lineup={lineup} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
