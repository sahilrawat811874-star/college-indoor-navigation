import { Module } from '@nestjs/common';
import { FacilityController } from './facilities.controller';
import { FacilityService } from './facilities.service';

@Module({ controllers: [FacilityController], providers: [FacilityService], exports: [FacilityService] })
export class FacilityModule {}
