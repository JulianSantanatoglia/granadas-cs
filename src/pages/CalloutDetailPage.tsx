import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { BackgroundPage } from "../components/layout/BackgroundPage";
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { getMap, getMapBackground } from "../lib/loadLineups";
import type { MapId } from "../types/lineup";

export default function CalloutDetailPage() {
  const { mapId } = useParams<{ mapId: MapId }>();
  const map = mapId ? getMap(mapId) : undefined;
  const [imageFailed, setImageFailed] = useState(false);

  if (!map || !mapId) {
    return <Navigate to="/callouts" replace />;
  }

  const calloutImage = `/images/mapas/${mapId}-mapa.png`;

  return (
    <BackgroundPage image={getMapBackground(mapId)}>
      <Breadcrumb items={[{ label: "Calls", to: "/callouts" }, { label: map.name }]} />
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-50">{map.name}</h1>

      {imageFailed ? (
        <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-gray-500">
          Todavía no hay diagrama de zonas cargado para este mapa.
        </p>
      ) : (
        <img
          src={calloutImage}
          alt={`Nombres de zonas de ${map.name}`}
          className="w-full rounded-2xl border border-white/10 shadow-md shadow-black/30"
          onError={() => setImageFailed(true)}
        />
      )}
    </BackgroundPage>
  );
}
