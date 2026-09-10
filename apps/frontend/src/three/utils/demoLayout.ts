import type { CampusMapDto, FloorDto, RoomDto, SceneRoom } from '../../types/map';
const blockOffsets: Record<string, number> = { A: 0, B: 140, C: 280 };
export function blockX(code: string) { return blockOffsets[code] ?? 0; }
export function floorY(floor: FloorDto) { return floor.elevationMeters; }
export function roomToScene(room: RoomDto, map: CampusMapDto): SceneRoom {
  const block = map.blocks.find((b) => b.id === room.blockId); const floor = map.floors.find((f) => f.id === room.floorId);
  const index = map.rooms.filter((r) => r.floorId === room.floorId).findIndex((r) => r.id === room.id);
  return { ...room, x: blockX(block?.code ?? 'A') + 18 + (index % 4) * 20, z: 12 + Math.floor(index / 4) * 18, y: floor?.elevationMeters ?? 0, width: 14, depth: 10 };
}
