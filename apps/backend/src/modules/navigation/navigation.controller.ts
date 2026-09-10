import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service';
import { RouteRequestDto } from './dto/route-request.dto';
import { NavigationService } from './services/navigation.service';
@ApiTags('Navigation')
@Controller('navigation')
export class NavigationController {
  constructor(private navigation: NavigationService, private prisma: PrismaService) {}
  @Post('route') route(@Body() dto: RouteRequestDto) { return this.navigation.route(dto); }
  @Get('nodes') nodes(@Query('q') q = '') { return this.prisma.navigationNode.findMany({ where: { isActive: true, ...(q ? { label: { contains: q, mode: 'insensitive' } } : {}) }, take: 50 }); }
  @Get('edges') edges() { return this.prisma.navigationEdge.findMany({ where: { isActive: true }, take: 200 }); }
}
