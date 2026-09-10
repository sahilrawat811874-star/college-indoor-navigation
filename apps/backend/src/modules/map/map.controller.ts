import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MapService } from './map.service';
@ApiTags('Map')
@Controller('map')
export class MapController { constructor(private readonly mapService: MapService) {} @Get('campus') getCampusMap() { return this.mapService.getCampusMap(); } }
