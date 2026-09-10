import { Layers, LocateFixed } from 'lucide-react';
import { BlockSelector } from '../../features/blocks/components/BlockSelector';
import { FloorSelector } from '../../features/floors/components/FloorSelector';
import { RoomDetails } from '../../features/rooms/components/RoomDetails';
import { RoomList } from '../../features/rooms/components/RoomList';
import { useMapStore } from '../../stores/mapStore';
import type { CampusMapDto } from '../../types/map';
export function MapControlPanel({ map }: { map: CampusMapDto }) {
  const { selectedBlockId, selectedFloorId, selectedRoomId, mode, showAllFloors, setMode, toggleAllFloors } = useMapStore();
  const filteredRooms = map.rooms.filter(r=>(!selectedBlockId || r.blockId===selectedBlockId) && (!selectedFloorId || r.floorId===selectedFloorId));
  const selectedRoom = map.rooms.find(r=>r.id===selectedRoomId); const selectedBlock = selectedRoom ? map.blocks.find(b=>b.id===selectedRoom.blockId) : undefined; const selectedFloor = selectedRoom ? map.floors.find(f=>f.id===selectedRoom.floorId) : undefined;
  return <aside className="panel"><button className="primary"><LocateFixed size={18}/> Set current location</button><BlockSelector blocks={map.blocks}/><FloorSelector blocks={map.blocks} floors={map.floors}/><div className="segmented"><button className={mode==='2d'?'active':''} onClick={()=>setMode('2d')}>2D</button><button className={mode==='3d'?'active':''} onClick={()=>setMode('3d')}>3D</button></div><button onClick={toggleAllFloors}><Layers size={18}/>{showAllFloors ? 'Isolate selected floor' : 'Show all floors'}</button><RoomDetails room={selectedRoom} block={selectedBlock} floor={selectedFloor}/><section><h2 className="panel-title">Rooms</h2><RoomList blocks={map.blocks} floors={map.floors} rooms={filteredRooms}/></section></aside>;
}
