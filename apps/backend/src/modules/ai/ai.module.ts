import { Module } from '@nestjs/common';
import { NavigationModule } from '../navigation/navigation.module';
import { AiController } from './ai.controller';
import { AiSearchService } from './services/ai-search.service';
import { IntentParserService } from './services/intent-parser.service';
@Module({ imports:[NavigationModule], controllers:[AiController], providers:[AiSearchService, IntentParserService] })
export class AiModule {}
