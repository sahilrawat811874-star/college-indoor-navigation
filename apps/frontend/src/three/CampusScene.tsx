import { Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useMapStore } from '../stores/mapStore';
import type { CampusMapDto } from '../types/map';
import { FloorLayer } from './layers/FloorLayer';
import { RouteLayer } from './layers/RouteLayer';
export function CampusScene({ map }: { map: CampusMapDto }) {
  const { selectedBlockId, selectedFloorId, showAllFloors, mode } = useMapStore(); const floors = map.floors.filter((f) => (!selectedBlockId || f.blockId === selectedBlockId) && (showAllFloors || !selectedFloorId || f.id === selectedFloorId));
  return <>
    <PerspectiveCamera makeDefault position={mode === '2d' ? [150, 260, 35] : [160, 120, 155]} fov={45} />
    <OrbitControls enableRotate={mode === '3d'} maxPolarAngle={mode === '2d' ? 0 : Math.PI / 2.05} />
    <ambientLight intensity={0.8} /><directionalLight position={[80, 120, 60]} intensity={1.5} castShadow />
    <Grid args={[420, 42]} position={[150, -0.08, 35]} cellColor="#E6E5E3" sectionColor="#C8C6C1" />
    {floors.map((floor) => <FloorLayer key={floor.id} floor={floor} map={map} />)}
    <RouteLayer />
  </>;
}
