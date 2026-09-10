export type GraphNode = { id: string; x: number; y: number; z: number; label: string; floorId: string; nodeType: string };
export type GraphEdge = { id: string; fromNodeId: string; toNodeId: string; distanceMeters: number; cost: number; edgeType: string; isAccessible: boolean; isBidirectional: boolean };
export type RoutePath = { nodeIds: string[]; edgeIds: string[]; totalCost: number; distanceMeters: number };

function heuristic(a: GraphNode, b: GraphNode) {
  const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function astar(nodes: GraphNode[], edges: GraphEdge[], startId: string, goalId: string): RoutePath | null {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const start = nodeMap.get(startId), goal = nodeMap.get(goalId);
  if (!start || !goal) return null;
  const adjacency = new Map<string, Array<{ edge: GraphEdge; to: string }>>();
  for (const e of edges) {
    if (!adjacency.has(e.fromNodeId)) adjacency.set(e.fromNodeId, []);
    adjacency.get(e.fromNodeId)!.push({ edge: e, to: e.toNodeId });
    if (e.isBidirectional) {
      if (!adjacency.has(e.toNodeId)) adjacency.set(e.toNodeId, []);
      adjacency.get(e.toNodeId)!.push({ edge: e, to: e.fromNodeId });
    }
  }
  const open = new Set([startId]);
  const cameFrom = new Map<string, { previous: string; edge: GraphEdge }>();
  const g = new Map<string, number>([[startId, 0]]);
  const f = new Map<string, number>([[startId, heuristic(start, goal)]]);
  while (open.size) {
    let current = [...open].reduce((best, id) => (f.get(id) ?? Infinity) < (f.get(best) ?? Infinity) ? id : best);
    if (current === goalId) {
      const nodeIds = [current]; const edgeIds: string[] = []; let distanceMeters = 0;
      while (cameFrom.has(current)) { const step = cameFrom.get(current)!; edgeIds.unshift(step.edge.id); distanceMeters += step.edge.distanceMeters; current = step.previous; nodeIds.unshift(current); }
      return { nodeIds, edgeIds, totalCost: g.get(goalId) ?? 0, distanceMeters };
    }
    open.delete(current);
    for (const { edge, to } of adjacency.get(current) ?? []) {
      const toNode = nodeMap.get(to); if (!toNode) continue;
      const tentative = (g.get(current) ?? Infinity) + edge.cost;
      if (tentative < (g.get(to) ?? Infinity)) {
        cameFrom.set(to, { previous: current, edge }); g.set(to, tentative); f.set(to, tentative + heuristic(toNode, goal)); open.add(to);
      }
    }
  }
  return null;
}
