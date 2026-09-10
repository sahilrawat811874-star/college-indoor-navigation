import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class NaturalLanguageQueryDto { @IsString() query!: string; @IsOptional() @IsString() currentNodeId?: string; @IsOptional() @IsBoolean() accessible?: boolean; }
