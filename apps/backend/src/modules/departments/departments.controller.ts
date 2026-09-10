import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './departments.service';

@ApiTags('Department')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly service: DepartmentService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
}
