import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import type { GraphEdge, GraphNode } from '../algorithms/astar';
@Injectable()
export class GraphBuilderService {
  constructor(private prisma: PrismaService) {}
  async buildGraph(accessible = false) {
    const nodes = await this.prisma.$queryRawUnsafe<GraphNode[]>(`SELECT id, label, floor_id as "floorId", node_type as "nodeType", ST_X(position) as x, ST_Y(position) as y, ST_Z(position) as z FROM navigation_nodes WHERE is_active = true ${accessible ? 'AND is_accessible = true' : ''}`);
    const edges = await this.prisma.navigationEdge.findMany({ where: { isActive: true, ...(accessible ? { isAccessible: true } : {}) } });
    const graphEdges: GraphEdge[] = edges.map((e) => ({ id: e.id, fromNodeId: e.fromNodeId, toNodeId: e.toNodeId, distanceMeters: e.distanceMeters, cost: accessible && e.edgeType === 'ELEVATOR' ? Math.max(1, e.cost - 2) : e.cost, edgeType: e.edgeType, isAccessible: e.isAccessible, isBidirectional: e.isBidirectional }));
    return { nodes, edges: graphEdges };
  }
}
