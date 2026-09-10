import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UsersService } from './users.service';
@ApiTags('Users') @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Controller('users')
export class UsersController { constructor(private users: UsersService) {} @Roles(RoleName.ADMIN, RoleName.SUPER_ADMIN) @Get() findAll(){ return this.users.findAll(); } }
