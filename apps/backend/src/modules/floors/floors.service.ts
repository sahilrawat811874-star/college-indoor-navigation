import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class FloorService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() { return this.prisma.floor.findMany({ take: 100 }); }
  findOne(id: string) { return this.prisma.floor.findUnique({ where: { id } }); }
}
