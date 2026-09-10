import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './modules/health/health.module';
import { BlocksModule } from './modules/blocks/blocks.module';
import { FloorsModule } from './modules/floors/floors.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { FacilitiesModule } from './modules/facilities/facilities.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { MapModule } from './modules/map/map.module';
import { SearchModule } from './modules/search/search.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { AdminModule } from './modules/admin/admin.module';
import { AiModule } from './modules/ai/ai.module';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, HealthModule, BlocksModule, FloorsModule, RoomsModule, FacilitiesModule, DepartmentsModule, MapModule, SearchModule, AuthModule, UsersModule, NavigationModule, AdminModule, AiModule] })
export class AppModule {}
