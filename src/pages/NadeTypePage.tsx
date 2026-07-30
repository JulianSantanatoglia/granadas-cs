import { Navigate, useParams } from "react-router-dom";
import { NadeTypeTabs } from "../components/NadeTypeTabs";
import { ZoneList } from "../components/ZoneList";
import { BackLink } from "../components/layout/BackLink";
import { PageContainer } from "../components/layout/PageContainer";
import { getLineups, getMap, groupByZone } from "../lib/loadLineups";
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
    return <Navigate to="/" replace />;
  }

  if (!nadeType || !isValidNadeType) {
    return <Navigate to={`/maps/${mapId}/${side}/smoke`} replace />;
  }

  const zones = groupByZone(getLineups(mapId, side, nadeType));

  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <BackLink to={`/maps/${mapId}`} label="Equipo" />
        <h1 className="text-2xl font-bold text-gray-100">
          {map.name} · {side}
        </h1>
      </div>
      <NadeTypeTabs mapId={mapId} side={side} active={nadeType} />
      <ZoneList zones={zones} />
    </PageContainer>
  );
}
