import { Module } from '@nestjs/common';
import { NavigationController } from './navigation.controller';
import { GraphBuilderService } from './services/graph-builder.service';
import { InstructionGeneratorService } from './services/instruction-generator.service';
import { NavigationService } from './services/navigation.service';
@Module({ controllers: [NavigationController], providers: [NavigationService, GraphBuilderService, InstructionGeneratorService], exports: [NavigationService] })
export class NavigationModule {}
