import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './modules/database/database.module';
import { WorldModule } from './modules/world/world.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    WorldModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule { }
