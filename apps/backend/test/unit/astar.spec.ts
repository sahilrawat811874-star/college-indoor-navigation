import { astar, GraphEdge, GraphNode } from '../../src/modules/navigation/algorithms/astar';

describe('A* routing algorithm', () => {
  const nodes: GraphNode[] = [
    { id: 'A', x: 0, y: 0, z: 0, label: 'A', floorId: 'f0', nodeType: 'CORRIDOR_POINT' },
    { id: 'B', x: 1, y: 0, z: 0, label: 'B', floorId: 'f0', nodeType: 'CORRIDOR_POINT' },
    { id: 'C', x: 2, y: 0, z: 0, label: 'C', floorId: 'f0', nodeType: 'ROOM_ENTRANCE' },
    { id: 'D', x: 0, y: 5, z: 0, label: 'D', floorId: 'f0', nodeType: 'CORRIDOR_POINT' }
  ];
  const edges: GraphEdge[] = [
    { id: 'AB', fromNodeId: 'A', toNodeId: 'B', distanceMeters: 1, cost: 1, edgeType: 'CORRIDOR', isAccessible: true, isBidirectional: true },
    { id: 'BC', fromNodeId: 'B', toNodeId: 'C', distanceMeters: 1, cost: 1, edgeType: 'CORRIDOR', isAccessible: true, isBidirectional: true },
    { id: 'AD', fromNodeId: 'A', toNodeId: 'D', distanceMeters: 5, cost: 5, edgeType: 'CORRIDOR', isAccessible: true, isBidirectional: true },
    { id: 'DC', fromNodeId: 'D', toNodeId: 'C', distanceMeters: 5, cost: 5, edgeType: 'CORRIDOR', isAccessible: true, isBidirectional: true }
  ];

  it('finds the lowest-cost route', () => {
    expect(astar(nodes, edges, 'A', 'C')?.nodeIds).toEqual(['A', 'B', 'C']);
  });

  it('returns null for missing nodes', () => {
    expect(astar(nodes, edges, 'A', 'Z')).toBeNull();
  });
});
