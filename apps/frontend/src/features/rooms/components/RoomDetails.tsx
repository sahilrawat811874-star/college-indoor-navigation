import type { BlockDto, FloorDto, RoomDto } from '../../../types/map';
export function RoomDetails({ room, block, floor }: { room?: RoomDto; block?: BlockDto; floor?: FloorDto }) {
  if (!room) return <div className="card"><h2>Select a room</h2><p>Click a room on the 3D map or choose one from the list.</p></div>;
  return <div className="card"><h2>{room.roomNumber}</h2><p>{room.name}</p><dl><dt>Block</dt><dd>{block?.name ?? 'Unknown'}</dd><dt>Floor</dt><dd>{floor?.label ?? 'Unknown'}</dd><dt>Type</dt><dd>{room.type}</dd><dt>Accessibility</dt><dd>{room.isAccessible ? 'Accessible' : 'Not marked accessible'}</dd><dt>Access</dt><dd>{room.isRestricted ? 'Restricted' : 'Open'}</dd></dl><div className="action-row"><button className="primary">View on map</button><button>Navigate</button></div></div>;
}
