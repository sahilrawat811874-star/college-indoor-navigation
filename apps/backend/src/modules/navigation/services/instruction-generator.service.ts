import { Injectable } from '@nestjs/common';
import type { GraphEdge, GraphNode } from '../algorithms/astar';
@Injectable()
export class InstructionGeneratorService {
  generate(pathNodeIds: string[], pathEdgeIds: string[], nodes: GraphNode[], edges: GraphEdge[]) {
    const nodeMap = new Map(nodes.map(n => [n.id, n])); const edgeMap = new Map(edges.map(e => [e.id, e]));
    const steps = pathEdgeIds.map((edgeId, i) => { const edge = edgeMap.get(edgeId)!; const from = nodeMap.get(pathNodeIds[i])!; const to = nodeMap.get(pathNodeIds[i+1])!; let instruction = `Walk ${Math.round(edge.distanceMeters)} meters toward ${to.label}.`; if (edge.edgeType === 'STAIRS') instruction = `Take stairs from ${from.label} to ${to.label}.`; if (edge.edgeType === 'ELEVATOR') instruction = `Take elevator from ${from.label} to ${to.label}.`; if (edge.edgeType === 'BLOCK_CONNECTOR') instruction = `Follow the connecting pathway to ${to.label}.`; if (edge.edgeType === 'ROOM_ENTRY') instruction = `${to.label} is ahead.`; return { sequence: i + 1, instruction, distanceMeters: edge.distanceMeters, fromNodeId: from.id, toNodeId: to.id, edgeType: edge.edgeType }; });
    return [{ sequence: 0, instruction: `Start from ${nodeMap.get(pathNodeIds[0])?.label ?? 'start'}.`, distanceMeters: 0 }, ...steps];
  }
}
