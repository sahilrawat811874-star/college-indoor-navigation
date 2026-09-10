import type { CampusMapDto, FloorDto } from '../../types/map';
import { roomToScene, blockX } from '../utils/demoLayout';
import { RoomMesh } from '../meshes/RoomMesh';
export function FloorLayer({ floor, map }: { floor: FloorDto; map: CampusMapDto }) {
  const block = map.blocks.find((b) => b.id === floor.blockId); const x = blockX(block?.code ?? 'A'); const rooms = map.rooms.filter((r) => r.floorId === floor.id).map((r) => roomToScene(r, map));
  return <group>
    <mesh position={[x + 50, floor.elevationMeters, 35]} receiveShadow><boxGeometry args={[100, 0.18, 70]} /><meshStandardMaterial color="#F9F8F7" transparent opacity={0.86} /></mesh>
    <mesh position={[x + 50, floor.elevationMeters + 0.04, 35]}><boxGeometry args={[84, 0.08, 8]} /><meshStandardMaterial color="#F0EFED" /></mesh>
    {rooms.map((room) => <RoomMesh key={room.id} room={room} />)}
  </group>;
}
