import { Injectable, NotFoundException } from '@nestjs/common';
import { astar } from '../algorithms/astar';
import { RouteRequestDto } from '../dto/route-request.dto';
import { GraphBuilderService } from './graph-builder.service';
import { InstructionGeneratorService } from './instruction-generator.service';
@Injectable()
export class NavigationService {
  constructor(private graphBuilder: GraphBuilderService, private instructions: InstructionGeneratorService) {}
  async route(dto: RouteRequestDto) {
    const graph = await this.graphBuilder.buildGraph(Boolean(dto.accessible));
    const path = astar(graph.nodes, graph.edges, dto.startNodeId, dto.destinationNodeId);
    if (!path) throw new NotFoundException('No available route found');
    const routeNodes = path.nodeIds.map(id => graph.nodes.find(n => n.id === id));
    return { distanceMeters: Math.round(path.distanceMeters * 10) / 10, estimatedTimeSeconds: Math.ceil(path.distanceMeters / 1.2), accessible: Boolean(dto.accessible), nodeIds: path.nodeIds, edgeIds: path.edgeIds, path: routeNodes, steps: this.instructions.generate(path.nodeIds, path.edgeIds, graph.nodes, graph.edges) };
  }
}
