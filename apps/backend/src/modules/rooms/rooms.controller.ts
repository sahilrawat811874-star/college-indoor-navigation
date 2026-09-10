import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomService } from './rooms.service';

@ApiTags('Room')
@Controller('rooms')
export class RoomController {
  constructor(private readonly service: RoomService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
}
