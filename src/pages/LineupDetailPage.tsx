import { Navigate, useParams } from "react-router-dom";
import { LineupDetail } from "../components/LineupDetail";
import { BackgroundPage } from "../components/layout/BackgroundPage";
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { NADE_TYPE_LABELS, getLineup, getMap, getMapBackground } from "../lib/loadLineups";

export default function LineupDetailPage() {
  const { lineupId } = useParams<{ lineupId: string }>();
  const lineup = lineupId ? getLineup(lineupId) : undefined;

  if (!lineup) {
    return <Navigate to="/maps" replace />;
  }

  const map = getMap(lineup.map);

  return (
    <BackgroundPage image={getMapBackground(lineup.map)}>
      <Breadcrumb
        items={[
          { label: "Granadas", to: "/maps" },
          { label: map?.name ?? lineup.map, to: `/maps/${lineup.map}` },
          { label: lineup.side, to: `/maps/${lineup.map}/${lineup.side}` },
          {
            label: NADE_TYPE_LABELS[lineup.nadeType],
            to: `/maps/${lineup.map}/${lineup.side}/${lineup.nadeType}`,
          },
          { label: lineup.position },
        ]}
      />
      <LineupDetail lineup={lineup} />
    </BackgroundPage>
  );
}
