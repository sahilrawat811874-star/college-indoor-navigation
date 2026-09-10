import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}
  async search(q: string) {
    const query = q.trim();
    if (!query) return { results: [] };
    const [rooms, facilities, departments] = await Promise.all([
      this.prisma.room.findMany({ where: { OR: [{ roomNumber: { contains: query, mode: 'insensitive' } }, { name: { contains: query, mode: 'insensitive' } }] }, take: 20 }),
      this.prisma.facility.findMany({ where: { name: { contains: query, mode: 'insensitive' } }, take: 20 }),
      this.prisma.department.findMany({ where: { OR: [{ name: { contains: query, mode: 'insensitive' } }, { code: { contains: query, mode: 'insensitive' } }] }, take: 20 }),
    ]);
    return { results: [
      ...rooms.map((item) => ({ type: 'room', item })),
      ...facilities.map((item) => ({ type: 'facility', item })),
      ...departments.map((item) => ({ type: 'department', item })),
    ] };
  }
}
