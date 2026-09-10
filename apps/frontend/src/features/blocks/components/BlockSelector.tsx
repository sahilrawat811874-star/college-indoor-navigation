import type { BlockDto } from '../../../types/map';
import { useMapStore } from '../../../stores/mapStore';
export function BlockSelector({ blocks }: { blocks: BlockDto[] }) {
  const { selectedBlockId, setBlock, setFloor, setRoom } = useMapStore();
  return <div className="selector-group"><label>Block</label><select value={selectedBlockId ?? ''} onChange={(e)=>{const id=e.target.value||undefined; setBlock(id); setFloor(undefined); setRoom(undefined);}}><option value="">All blocks</option>{blocks.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></div>;
}
