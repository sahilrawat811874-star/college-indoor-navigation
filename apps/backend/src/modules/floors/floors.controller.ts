import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FloorService } from './floors.service';

@ApiTags('Floor')
@Controller('floors')
export class FloorController {
  constructor(private readonly service: FloorService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
}
