import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsRouter } from './items.router';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRouter],
})
export class ItemsModule {}
