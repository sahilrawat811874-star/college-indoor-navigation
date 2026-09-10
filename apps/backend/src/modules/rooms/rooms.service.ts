import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() { return this.prisma.room.findMany({ take: 100 }); }
  findOne(id: string) { return this.prisma.room.findUnique({ where: { id } }); }
}
