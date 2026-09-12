import { PrismaClient, FacilityType, NavigationEdgeType, NavigationNodeType, RoleName, RoomType } from '@prisma/client';

const prisma = new PrismaClient();

const floorLabels = new Map<number, string>([
  [0, 'Ground Floor'],
  [1, '1st Floor'],
  [2, '2nd Floor'],
  [3, '3rd Floor'],
]);

function point(x: number, y: number, z = 0) {
  return `ST_SetSRID(ST_MakePoint(${x}, ${y}, ${z}), 3857)`;
}

function polygon(x: number, y: number, width: number, depth: number) {
  return `ST_SetSRID(ST_MakePolygon(ST_GeomFromText('LINESTRING(${x} ${y}, ${x + width} ${y}, ${x + width} ${y + depth}, ${x} ${y + depth}, ${x} ${y})')), 3857)`;
}

function line(points: Array<[number, number, number]>) {
  const text = points.map(([x, y, z]) => `${x} ${y} ${z}`).join(', ');
  return `ST_SetSRID(ST_GeomFromText('LINESTRING Z(${text})'), 3857)`;
}

async function setGeometry(table: string, id: string, assignments: Record<string, string>) {
  const setClause = Object.entries(assignments).map(([column, expression]) => `"${column}" = ${expression}`).join(', ');
  await prisma.$executeRawUnsafe(`UPDATE "${table}" SET ${setClause} WHERE id = $1`, id);
}

async function main() {
  await prisma.navigationEdge.deleteMany();
  await prisma.qrLocationMarker.deleteMany();
  await prisma.navigationNode.deleteMany();
  await prisma.facultyMember.deleteMany();
  await prisma.facility.deleteMany();
  await prisma.department.deleteMany();
  await prisma.room.deleteMany();
  await prisma.floor.deleteMany();
  await prisma.block.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  for (const name of Object.values(RoleName)) {
    await prisma.role.create({ data: { name, description: `${name.replace('_', ' ').toLowerCase()} role` } });
  }

  const blockSpecs = [
    { code: 'A', name: 'A Block', x: 0, y: 0, floors: 4 },
    { code: 'B', name: 'B Block', x: 140, y: 0, floors: 3 },
    { code: 'C', name: 'C Block', x: 280, y: 0, floors: 3 },
  ];

  const blocks = new Map<string, Awaited<ReturnType<typeof prisma.block.create>>>();
  const floors = new Map<string, Awaited<ReturnType<typeof prisma.floor.create>>>();

  for (const spec of blockSpecs) {
    const block = await prisma.block.create({ data: { code: spec.code, name: spec.name, description: `Demo ${spec.name}` } });
    await setGeometry('blocks', block.id, { geometry: polygon(spec.x, spec.y, 100, 70), centroid: point(spec.x + 50, spec.y + 35) });
    blocks.set(spec.code, block);

    for (let floorNumber = 0; floorNumber < spec.floors; floorNumber++) {
      const floor = await prisma.floor.create({
        data: { blockId: block.id, floorNumber, label: floorLabels.get(floorNumber) ?? `Floor ${floorNumber}`, elevationMeters: floorNumber * 4 },
      });
      await setGeometry('floors', floor.id, { floor_plan_geometry: polygon(spec.x, spec.y, 100, 70) });
      floors.set(`${spec.code}-${floorNumber}`, floor);
    }
  }

  const cse = await prisma.department.create({ data: { code: 'CSE', name: 'Computer Science Engineering', description: 'Demo CSE department' } });
  const bca = await prisma.department.create({ data: { code: 'BCA', name: 'Bachelor of Computer Applications', description: 'Demo BCA department' } });

  const roomSpecs = [
    { block: 'A', floor: 0, no: 'A-G-ENT', name: 'Main Entrance', type: RoomType.OTHER, x: 8, y: 28 },
    { block: 'A', floor: 1, no: 'A-105', name: 'Classroom A-105', type: RoomType.CLASSROOM, x: 18, y: 12 },
    { block: 'A', floor: 2, no: 'A-204', name: 'Room A-204', type: RoomType.CLASSROOM, x: 64, y: 12 },
    { block: 'B', floor: 1, no: 'B-105', name: 'BCA Lab', type: RoomType.LAB, x: 158, y: 12, departmentId: bca.id },
    { block: 'B', floor: 2, no: 'B-204', name: 'Room B-204', type: RoomType.CLASSROOM, x: 204, y: 12 },
    { block: 'C', floor: 2, no: 'C-208', name: 'Room C-208', type: RoomType.CLASSROOM, x: 344, y: 12 },
    { block: 'C', floor: 1, no: 'CSE-OFF', name: 'CSE Department Office', type: RoomType.OFFICE, x: 298, y: 12, departmentId: cse.id },
  ];

  const rooms = [];
  for (const r of roomSpecs) {
    const block = blocks.get(r.block)!;
    const floor = floors.get(`${r.block}-${r.floor}`)!;
    const room = await prisma.room.create({ data: { blockId: block.id, floorId: floor.id, departmentId: r.departmentId, roomNumber: r.no, name: r.name, type: r.type, capacity: 40, isAccessible: true } });
    const z = floor.elevationMeters;
    await setGeometry('rooms', room.id, { geometry: polygon(r.x, r.y, 16, 12), entrance_point: point(r.x + 8, r.y + 14, z), center_point: point(r.x + 8, r.y + 6, z) });
    rooms.push({ ...r, id: room.id, blockId: block.id, floorId: floor.id, z, entranceX: r.x + 8, entranceY: r.y + 14 });
  }

  const facilitySpecs = [
    { block: 'A', floor: 0, name: 'A Block Washroom', type: FacilityType.WASHROOM, x: 80, y: 52 },
    { block: 'A', floor: 0, name: 'Library', type: FacilityType.LIBRARY, x: 38, y: 50 },
    { block: 'B', floor: 0, name: 'Canteen', type: FacilityType.CANTEEN, x: 178, y: 52 },
    { block: 'C', floor: 0, name: 'Auditorium', type: FacilityType.AUDITORIUM, x: 318, y: 50 },
    { block: 'A', floor: 0, name: 'Staircase 1', type: FacilityType.STAIRCASE, x: 50, y: 35 },
    { block: 'A', floor: 0, name: 'Elevator 1', type: FacilityType.ELEVATOR, x: 58, y: 35 },
  ];

  for (const f of facilitySpecs) {
    const block = blocks.get(f.block)!;
    const floor = floors.get(`${f.block}-${f.floor}`)!;
    const facility = await prisma.facility.create({ data: { blockId: block.id, floorId: floor.id, name: f.name, type: f.type, isAccessible: f.type !== FacilityType.STAIRCASE } });
    await setGeometry('facilities', facility.id, { geometry: point(f.x, f.y, floor.elevationMeters) });
  }

  const nodeByLabel = new Map<string, string>();
  async function addNode(label: string, blockCode: string, floorNumber: number, nodeType: NavigationNodeType, x: number, y: number, accessible = true) {
    const block = blocks.get(blockCode)!;
    const floor = floors.get(`${blockCode}-${floorNumber}`)!;
const nodeId = crypto.randomUUID();

await prisma.$executeRawUnsafe(
  `INSERT INTO navigation_nodes
   (id, block_id, floor_id, node_type, label, is_accessible)
   VALUES ($1, $2, $3, $4, $5, $6)`,
  nodeId,
  block.id,
  floor.id,
  nodeType,
  label,
  accessible
);

const node = await prisma.navigationNode.findUniqueOrThrow({
  where: { id: nodeId }
});
    await setGeometry('navigation_nodes', node.id, { position: point(x, y, floor.elevationMeters) });
    nodeByLabel.set(label, node.id);
    return node;
  }

  for (const spec of blockSpecs) {
    for (let f = 0; f < spec.floors; f++) {
      await addNode(`${spec.code}-${f}-ENTRANCE`, spec.code, f, f === 0 ? NavigationNodeType.BLOCK_ENTRANCE : NavigationNodeType.CORRIDOR_POINT, spec.x + 10, 35);
      await addNode(`${spec.code}-${f}-CORRIDOR-W`, spec.code, f, NavigationNodeType.CORRIDOR_POINT, spec.x + 25, 35);
      await addNode(`${spec.code}-${f}-CORRIDOR-C`, spec.code, f, NavigationNodeType.INTERSECTION, spec.x + 50, 35);
      await addNode(`${spec.code}-${f}-CORRIDOR-E`, spec.code, f, NavigationNodeType.CORRIDOR_POINT, spec.x + 75, 35);
      await addNode(`${spec.code}-${f}-STAIR-1`, spec.code, f, f === 0 ? NavigationNodeType.STAIR_ENTRY : NavigationNodeType.STAIR_EXIT, spec.x + 50, 42, false);
      await addNode(`${spec.code}-${f}-ELEVATOR-1`, spec.code, f, f === 0 ? NavigationNodeType.ELEVATOR_ENTRY : NavigationNodeType.ELEVATOR_EXIT, spec.x + 58, 42, true);
    }
  }

  for (const r of rooms) {
    await addNode(`${r.no}-DOOR`, r.block, r.floor, NavigationNodeType.ROOM_ENTRANCE, r.entranceX, r.entranceY, true);
  }

  async function addEdge(from: string, to: string, type: NavigationEdgeType, distance: number, accessible = true) {
    const fromId = nodeByLabel.get(from)!;
    const toId = nodeByLabel.get(to)!;
    const edge = await prisma.navigationEdge.create({ data: { fromNodeId: fromId, toNodeId: toId, edgeType: type, distanceMeters: distance, estimatedTimeSeconds: Math.ceil(distance / 1.2), cost: distance, isAccessible: accessible } });
    return edge;
  }

  for (const spec of blockSpecs) {
    for (let f = 0; f < spec.floors; f++) {
      await addEdge(`${spec.code}-${f}-ENTRANCE`, `${spec.code}-${f}-CORRIDOR-W`, NavigationEdgeType.CORRIDOR, 15);
      await addEdge(`${spec.code}-${f}-CORRIDOR-W`, `${spec.code}-${f}-CORRIDOR-C`, NavigationEdgeType.CORRIDOR, 25);
      await addEdge(`${spec.code}-${f}-CORRIDOR-C`, `${spec.code}-${f}-CORRIDOR-E`, NavigationEdgeType.CORRIDOR, 25);
      await addEdge(`${spec.code}-${f}-CORRIDOR-C`, `${spec.code}-${f}-STAIR-1`, NavigationEdgeType.CORRIDOR, 7, false);
      await addEdge(`${spec.code}-${f}-CORRIDOR-C`, `${spec.code}-${f}-ELEVATOR-1`, NavigationEdgeType.CORRIDOR, 9);
    }
    for (let f = 0; f < spec.floors - 1; f++) {
      await addEdge(`${spec.code}-${f}-STAIR-1`, `${spec.code}-${f + 1}-STAIR-1`, NavigationEdgeType.STAIRS, 12, false);
      await addEdge(`${spec.code}-${f}-ELEVATOR-1`, `${spec.code}-${f + 1}-ELEVATOR-1`, NavigationEdgeType.ELEVATOR, 5, true);
    }
  }

  await addEdge('A-0-CORRIDOR-E', 'B-0-ENTRANCE', NavigationEdgeType.BLOCK_CONNECTOR, 40);
  await addEdge('B-0-CORRIDOR-E', 'C-0-ENTRANCE', NavigationEdgeType.BLOCK_CONNECTOR, 40);

  for (const r of rooms) {
    const side = r.entranceX < (blocks.get(r.block)!.code === 'A' ? 50 : blocks.get(r.block)!.code === 'B' ? 190 : 330) ? 'CORRIDOR-W' : 'CORRIDOR-E';
    await addEdge(`${r.block}-${r.floor}-${side}`, `${r.no}-DOOR`, NavigationEdgeType.ROOM_ENTRY, 12);
  }

const qrId = crypto.randomUUID();

await prisma.$executeRawUnsafe(
  `INSERT INTO qr_location_markers
   (id, code, block_id, floor_id, navigation_node_id, label)
   VALUES ($1, $2, $3, $4, $5, $6)`,
  qrId,
  'QR-A-G-MAIN-ENTRANCE',
  blocks.get('A')!.id,
  floors.get('A-0')!.id,
  nodeByLabel.get('A-0-ENTRANCE')!,
  'A Block Ground Floor Main Entrance'
);
  await setGeometry('qr_location_markers', qrId, { position: point(10, 35, 0) });

  console.log('Seeded demo campus with A/B/C blocks, rooms, facilities, QR marker, and navigation graph.');
}

main().finally(async () => prisma.$disconnect());
