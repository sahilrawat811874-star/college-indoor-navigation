import type { BlockDto, FloorDto } from '../../../types/map';
import { useMapStore } from '../../../stores/mapStore';
export function FloorSelector({ blocks, floors }: { blocks: BlockDto[]; floors: FloorDto[] }) {
  const { selectedBlockId, selectedFloorId, setFloor, setRoom } = useMapStore();
  const visible = selectedBlockId ? floors.filter(f=>f.blockId===selectedBlockId) : floors;
  return <div className="selector-group"><label>Floor</label><select value={selectedFloorId ?? ''} onChange={(e)=>{setFloor(e.target.value||undefined); setRoom(undefined);}}><option value="">All floors</option>{visible.map(f=><option key={f.id} value={f.id}>{blocks.find(b=>b.id===f.blockId)?.code} Block · {f.label}</option>)}</select></div>;
}
