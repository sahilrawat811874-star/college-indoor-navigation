import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateEdgeDto, CreateFacilityDto, CreateNodeDto, CreateRoomDto } from './dto/admin-map.dto';
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  dashboard() { return Promise.all([this.prisma.block.count(),this.prisma.floor.count(),this.prisma.room.count(),this.prisma.facility.count(),this.prisma.navigationNode.count(),this.prisma.navigationEdge.count()]).then(([blocks,floors,rooms,facilities,nodes,edges])=>({blocks,floors,rooms,facilities,nodes,edges})); }
  createRoom(dto: CreateRoomDto) { return this.prisma.room.create({ data: { ...dto, isAccessible: dto.isAccessible ?? true, isRestricted: dto.isRestricted ?? false } }); }
  updateRoom(id: string, dto: Partial<CreateRoomDto>) { return this.prisma.room.update({ where:{id}, data: dto }); }
  deleteRoom(id: string) { return this.prisma.room.delete({ where:{id} }); }
  createFacility(dto: CreateFacilityDto) { return this.prisma.facility.create({ data: { ...dto, isAccessible: dto.isAccessible ?? true } }); }
async createNode(dto: CreateNodeDto) {
  const result = await this.prisma.$queryRawUnsafe<any[]>(
    `INSERT INTO navigation_nodes
      (block_id, floor_id, node_type, label, is_accessible, is_restricted, position)
     VALUES
      ($1, $2, $3, $4, $5, $6,
       ST_SetSRID(ST_MakePoint($7, $8, $9), 3857))
     RETURNING *`,
    dto.blockId,
    dto.floorId,
    dto.nodeType,
    dto.label,
    dto.isAccessible ?? true,
    dto.isRestricted ?? false,
    dto.x,
    dto.y,
    dto.z
  );

  return result[0];
}
  createEdge(dto: CreateEdgeDto) { return this.prisma.navigationEdge.create({ data:{ fromNodeId:dto.fromNodeId, toNodeId:dto.toNodeId, edgeType:dto.edgeType, distanceMeters:dto.distanceMeters, estimatedTimeSeconds:Math.ceil(dto.distanceMeters/1.2), cost:dto.distanceMeters, isAccessible:dto.isAccessible??true, isBidirectional:dto.isBidirectional??true } }); }
}
