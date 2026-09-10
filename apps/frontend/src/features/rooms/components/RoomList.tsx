import type { BlockDto, FloorDto, RoomDto } from '../../../types/map';
import { useMapStore } from '../../../stores/mapStore';
export function RoomList({ blocks, floors, rooms }: { blocks: BlockDto[]; floors: FloorDto[]; rooms: RoomDto[] }) {
  const { selectedRoomId, setRoom } = useMapStore();
  if (!rooms.length) return <p className="muted">No rooms match the selected block/floor.</p>;
  return <div className="room-list">{rooms.map(room=>{const floor=floors.find(f=>f.id===room.floorId); const block=blocks.find(b=>b.id===room.blockId); return <button key={room.id} className={selectedRoomId===room.id?'room-item active':'room-item'} onClick={()=>setRoom(room.id)}><strong>{room.roomNumber}</strong><span>{room.name}</span><small>{block?.code} Block · {floor?.label}</small></button>})}</div>;
}
