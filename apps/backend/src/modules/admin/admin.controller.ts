import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminService } from './admin.service';
import { CreateEdgeDto, CreateFacilityDto, CreateNodeDto, CreateRoomDto } from './dto/admin-map.dto';
@ApiTags('Admin') @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(RoleName.ADMIN, RoleName.SUPER_ADMIN, RoleName.MAP_EDITOR) @Controller('admin')
export class AdminController { constructor(private admin: AdminService) {}
@Get('dashboard') dashboard(){return this.admin.dashboard()}
@Post('rooms') createRoom(@Body() dto:CreateRoomDto){return this.admin.createRoom(dto)}
@Patch('rooms/:id') updateRoom(@Param('id') id:string,@Body() dto:Partial<CreateRoomDto>){return this.admin.updateRoom(id,dto)}
@Delete('rooms/:id') deleteRoom(@Param('id') id:string){return this.admin.deleteRoom(id)}
@Post('facilities') createFacility(@Body() dto:CreateFacilityDto){return this.admin.createFacility(dto)}
@Post('navigation-nodes') createNode(@Body() dto:CreateNodeDto){return this.admin.createNode(dto)}
@Post('navigation-edges') createEdge(@Body() dto:CreateEdgeDto){return this.admin.createEdge(dto)} }
