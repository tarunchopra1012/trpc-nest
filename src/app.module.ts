import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TrpcModule } from './trpc/trpc.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ItemsModule, TrpcModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
