import { Navigate, useParams } from "react-router-dom";
import { SideSelector } from "../components/SideSelector";
import { BackgroundPage } from "../components/layout/BackgroundPage";
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { getMap, getMapBackground } from "../lib/loadLineups";
import type { MapId } from "../types/lineup";

export default function TeamPage() {
  const { mapId } = useParams<{ mapId: MapId }>();
  const map = mapId ? getMap(mapId) : undefined;

  if (!map || !mapId) {
    return <Navigate to="/maps" replace />;
  }

  return (
    <BackgroundPage image={getMapBackground(mapId)}>
      <div className="flex flex-col gap-2">
        <Breadcrumb items={[{ label: "Granadas", to: "/maps" }, { label: map.name }]} />
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-50">{map.name}</h1>
        <p className="text-sm text-gray-300">Elegí tu equipo.</p>
      </div>
      <SideSelector mapId={mapId} />
    </BackgroundPage>
  );
}
