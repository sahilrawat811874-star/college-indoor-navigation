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
  async createNode(dto: CreateNodeDto) { const node = await this.prisma.navigationNode.create({ data:{ blockId:dto.blockId, floorId:dto.floorId, nodeType:dto.nodeType, label:dto.label, isAccessible:dto.isAccessible??true, isRestricted:dto.isRestricted??false } }); await this.prisma.$executeRawUnsafe('UPDATE navigation_nodes SET position = ST_SetSRID(ST_MakePoint($1,$2,$3),3857) WHERE id = $4', dto.x,dto.y,dto.z,node.id); return node; }
  createEdge(dto: CreateEdgeDto) { return this.prisma.navigationEdge.create({ data:{ fromNodeId:dto.fromNodeId, toNodeId:dto.toNodeId, edgeType:dto.edgeType, distanceMeters:dto.distanceMeters, estimatedTimeSeconds:Math.ceil(dto.distanceMeters/1.2), cost:dto.distanceMeters, isAccessible:dto.isAccessible??true, isBidirectional:dto.isBidirectional??true } }); }
}
