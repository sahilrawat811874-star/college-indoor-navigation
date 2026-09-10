import { Module } from '@nestjs/common';
import { FloorController } from './floors.controller';
import { FloorService } from './floors.service';

@Module({ controllers: [FloorController], providers: [FloorService], exports: [FloorService] })
export class FloorModule {}
