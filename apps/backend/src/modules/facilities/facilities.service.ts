import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class FacilityService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() { return this.prisma.facility.findMany({ take: 100 }); }
  findOne(id: string) { return this.prisma.facility.findUnique({ where: { id } }); }
}
