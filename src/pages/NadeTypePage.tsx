import { Navigate, useParams } from "react-router-dom";
import { NadeTypeTabs } from "../components/NadeTypeTabs";
import { ZoneList } from "../components/ZoneList";
import { BackgroundPage } from "../components/layout/BackgroundPage";
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { NADE_TYPE_LABELS, getLineups, getMap, getMapBackground, groupByZone } from "../lib/loadLineups";
import type { MapId, NadeType, Side } from "../types/lineup";

const VALID_SIDES: Side[] = ["CT", "T"];
const VALID_NADE_TYPES: NadeType[] = ["smoke", "molotov", "flash", "he"];

export default function NadeTypePage() {
  const params = useParams<{ mapId: MapId; side: Side; nadeType: NadeType }>();
  const { mapId, side, nadeType } = params;

  const map = mapId ? getMap(mapId) : undefined;
  const isValidSide = side ? VALID_SIDES.includes(side) : false;
  const isValidNadeType = nadeType ? VALID_NADE_TYPES.includes(nadeType) : false;

  if (!map || !mapId || !side || !isValidSide) {
    return <Navigate to="/maps" replace />;
  }

  if (!nadeType || !isValidNadeType) {
    return <Navigate to={`/maps/${mapId}/${side}/smoke`} replace />;
  }

  const zones = groupByZone(getLineups(mapId, side, nadeType));

  return (
    <BackgroundPage image={getMapBackground(mapId)}>
      <div className="flex flex-col gap-2">
        <Breadcrumb
          items={[
            { label: "Granadas", to: "/maps" },
            { label: map.name, to: `/maps/${mapId}` },
            { label: side },
            { label: NADE_TYPE_LABELS[nadeType] },
          ]}
        />
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-50">
          {map.name} · {side}
        </h1>
      </div>
      <NadeTypeTabs mapId={mapId} side={side} active={nadeType} />
      <ZoneList zones={zones} />
    </BackgroundPage>
  );
}
