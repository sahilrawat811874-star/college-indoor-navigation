import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FacilityService } from './facilities.service';

@ApiTags('Facility')
@Controller('facilities')
export class FacilityController {
  constructor(private readonly service: FacilityService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
}
