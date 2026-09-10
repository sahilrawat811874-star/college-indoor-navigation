import { Text } from '@react-three/drei';
import { useMapStore } from '../../stores/mapStore';
import type { SceneRoom } from '../../types/map';
export function RoomMesh({ room }: { room: SceneRoom }) {
  const selectedRoomId = useMapStore((s) => s.selectedRoomId); const setRoom = useMapStore((s) => s.setRoom); const selected = selectedRoomId === room.id;
  return <group position={[room.x, room.y + 0.15, room.z]} onClick={(e) => { e.stopPropagation(); setRoom(room.id); }}>
    <mesh castShadow receiveShadow><boxGeometry args={[room.width, 0.28, room.depth]} /><meshStandardMaterial color={selected ? '#2783DE' : room.isRestricted ? '#FCE9E7' : '#E5F2FC'} /></mesh>
    <lineSegments><edgesGeometry args={[undefined as never]} /><lineBasicMaterial color="#7D7A75" /></lineSegments>
    <Text position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={2.2} color="#2C2C2B" anchorX="center" anchorY="middle">{room.roomNumber}</Text>
  </group>;
}
