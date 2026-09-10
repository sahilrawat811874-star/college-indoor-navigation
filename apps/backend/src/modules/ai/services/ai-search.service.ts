import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { NavigationService } from '../../navigation/services/navigation.service';
import { NaturalLanguageQueryDto } from '../dto/natural-language-query.dto';
import { IntentParserService } from './intent-parser.service';
@Injectable()
export class AiSearchService {
  constructor(private prisma: PrismaService, private parser: IntentParserService, private navigation: NavigationService) {}
  async handle(dto: NaturalLanguageQueryDto) {
    const parsed = this.parser.parse(dto.query, Boolean(dto.accessible));
    if (parsed.intent === 'nearest_facility') return this.findNearestFacility(parsed.facilityType!, dto);
    const location = await this.findBestLocation(parsed.query);
    if (!location) throw new NotFoundException('No matching location found');
    if (parsed.intent === 'navigate_to_location' && dto.currentNodeId && location.nodeId) {
      const route = await this.navigation.route({ startNodeId: dto.currentNodeId, destinationNodeId: location.nodeId, accessible: dto.accessible });
      return { parsed, location, route };
    }
    return { parsed, location };
  }
  private async findBestLocation(query: string) {
    const room = await this.prisma.room.findFirst({ where: { OR:[{ roomNumber:{ contains:query, mode:'insensitive'} }, { name:{ contains:query, mode:'insensitive'} }, { type:{ equals: query.toUpperCase() as never } }] }, include:{ block:true, floor:true } });
    if (room) { const node = await this.prisma.navigationNode.findFirst({ where:{ label:`${room.roomNumber}-DOOR` } }); return { type:'room', id:room.id, label:room.name, roomNumber:room.roomNumber, block:room.block.name, floor:room.floor.label, nodeId:node?.id }; }
    const facility = await this.prisma.facility.findFirst({ where:{ OR:[{ name:{ contains:query, mode:'insensitive'} }, { type:{ equals: query.toUpperCase() as never } }] }, include:{ block:true, floor:true } });
    if (facility) return { type:'facility', id:facility.id, label:facility.name, block:facility.block.name, floor:facility.floor.label };
    const dept = await this.prisma.department.findFirst({ where:{ OR:[{ name:{ contains:query, mode:'insensitive'} }, { code:{ contains:query, mode:'insensitive'} }] } });
    if (dept?.officeRoomId) { const room = await this.prisma.room.findUnique({ where:{ id:dept.officeRoomId }, include:{block:true,floor:true} }); if(room){ const node=await this.prisma.navigationNode.findFirst({where:{label:`${room.roomNumber}-DOOR`}}); return { type:'department', id:dept.id, label:dept.name, roomNumber:room.roomNumber, block:room.block.name, floor:room.floor.label, nodeId:node?.id }; } }
    return null;
  }
  private async findNearestFacility(facilityType: string, dto: NaturalLanguageQueryDto) {
    const facilities = await this.prisma.facility.findMany({ where:{ type: facilityType as never, isAccessible: dto.accessible ? true : undefined }, include:{block:true,floor:true} });
    if (!facilities.length) throw new NotFoundException('No matching facility found');
    return { parsed:this.parser.parse(dto.query, Boolean(dto.accessible)), results: facilities.map(f=>({ type:'facility', id:f.id, label:f.name, block:f.block.name, floor:f.floor.label })) };
  }
}
