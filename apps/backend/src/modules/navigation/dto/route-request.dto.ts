import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class RouteRequestDto {
  @IsString() startNodeId!: string;
  @IsString() destinationNodeId!: string;
  @IsOptional() @IsBoolean() accessible?: boolean;
}
