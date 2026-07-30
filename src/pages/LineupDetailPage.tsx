import { Navigate, useParams } from "react-router-dom";
import { LineupDetail } from "../components/LineupDetail";
import { BackLink } from "../components/layout/BackLink";
import { PageContainer } from "../components/layout/PageContainer";
import { getLineup } from "../lib/loadLineups";

export default function LineupDetailPage() {
  const { lineupId } = useParams<{ lineupId: string }>();
  const lineup = lineupId ? getLineup(lineupId) : undefined;

  if (!lineup) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageContainer>
      <BackLink to={`/maps/${lineup.map}/${lineup.side}/${lineup.nadeType}`} label="Posiciones" />
      <LineupDetail lineup={lineup} />
    </PageContainer>
  );
}
