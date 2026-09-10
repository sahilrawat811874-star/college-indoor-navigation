import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}

  async getCampusMap() {
    const [blocks, floors, rooms, facilities, navigationNodes, navigationEdges] = await Promise.all([
      this.prisma.block.findMany({ orderBy: { code: 'asc' } }),
      this.prisma.floor.findMany({ orderBy: [{ blockId: 'asc' }, { floorNumber: 'asc' }] }),
      this.prisma.room.findMany({ orderBy: { roomNumber: 'asc' } }),
      this.prisma.facility.findMany({ orderBy: { name: 'asc' } }),
      this.prisma.navigationNode.findMany({ where: { isActive: true } }),
      this.prisma.navigationEdge.findMany({ where: { isActive: true } }),
    ]);
    return { blocks, floors, rooms, facilities, navigationNodes, navigationEdges };
  }
}
