import { Module } from '@nestjs/common';
import { WorldController } from './controllers/world.controller';
import { WorldService } from './service/world.service';

@Module({
  controllers: [WorldController],
  providers: [WorldService]
})
export class WorldModule {}

