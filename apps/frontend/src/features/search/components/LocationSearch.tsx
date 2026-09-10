import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { BlockDto, FloorDto, RoomDto } from '../../../types/map';
import { useMapStore } from '../../../stores/mapStore';

export function LocationSearch({ blocks, floors, rooms }: { blocks: BlockDto[]; floors: FloorDto[]; rooms: RoomDto[] }) {
  const [q, setQ] = useState('');
  const { setBlock, setFloor, setRoom } = useMapStore();
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return rooms
      .filter((r) => [r.roomNumber, r.name, r.type].some((v) => v.toLowerCase().includes(term)))
      .slice(0, 6);
  }, [q, rooms]);

  return (
    <div className="search-stack">
      <div className="search">
        <Search size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Room B-204, BCA Lab, Library..." />
      </div>
      {results.length > 0 && (
        <div className="search-results">
          {results.map((r) => {
            const f = floors.find((x) => x.id === r.floorId);
            const b = blocks.find((x) => x.id === r.blockId);
            return (
              <button key={r.id} onClick={() => { setBlock(r.blockId); setFloor(r.floorId); setRoom(r.id); setQ(''); }}>
                <strong>{r.roomNumber}</strong>
                <span>{r.name}</span>
                <small>{b?.name} · {f?.label}</small>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
