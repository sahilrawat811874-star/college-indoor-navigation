import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './modules/health/health.module';
import { FloorModule } from './modules/floors/floors.module';
import { RoomModule } from './modules/rooms/rooms.module';
import { FacilityModule } from './modules/facilities/facilities.module';
import { DepartmentModule } from './modules/departments/departments.module';
import { MapModule } from './modules/map/map.module';
import { SearchModule } from './modules/search/search.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { AdminModule } from './modules/admin/admin.module';
import { AiModule } from './modules/ai/ai.module';
import { BlockModule } from './modules/blocks/blocks.module';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, HealthModule, BlockModule, FloorModule, RoomModule, FacilityModule, DepartmentModule, MapModule, SearchModule, AuthModule, UsersModule, NavigationModule, AdminModule, AiModule] })
export class AppModule {}
