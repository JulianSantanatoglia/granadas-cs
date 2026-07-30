import { Navigate, useParams } from "react-router-dom";
import { SideSelector } from "../components/SideSelector";
import { BackLink } from "../components/layout/BackLink";
import { PageContainer } from "../components/layout/PageContainer";
import { getMap } from "../lib/loadLineups";
import type { MapId } from "../types/lineup";

export default function TeamPage() {
  const { mapId } = useParams<{ mapId: MapId }>();
  const map = mapId ? getMap(mapId) : undefined;

  if (!map || !mapId) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <BackLink to="/" label="Mapas" />
        <h1 className="text-2xl font-bold text-gray-100">{map.name}</h1>
        <p className="text-sm text-gray-400">Elegí tu equipo.</p>
      </div>
      <SideSelector mapId={mapId} />
    </PageContainer>
  );
}
