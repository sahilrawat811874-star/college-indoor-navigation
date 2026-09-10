import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NaturalLanguageQueryDto } from './dto/natural-language-query.dto';
import { AiSearchService } from './services/ai-search.service';
@ApiTags('AI / Natural Language Search')
@Controller('ai')
export class AiController { constructor(private ai: AiSearchService) {} @Post('query') query(@Body() dto: NaturalLanguageQueryDto){ return this.ai.handle(dto); } }
