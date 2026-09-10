import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlockService } from './blocks.service';

@ApiTags('Block')
@Controller('blocks')
export class BlockController {
  constructor(private readonly service: BlockService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
}
