import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsRouter } from './products.router';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductsService, ProductsRouter],
})
export class ProductsModule {}
