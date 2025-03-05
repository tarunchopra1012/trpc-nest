import { Injectable } from '@nestjs/common';
import { Product } from './product.schema';
import { TRPCError } from '@trpc/server';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  createProduct(productData: Product) {
    this.products.push(productData);
    return productData;
  }

  getProductById(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Product not found',
      });
    }
    return product;
  }

  getAllProducts() {
    return this.products;
  }

  updateProduct(id: string, data: Partial<Product>) {
    /*
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Product not found',
      });
    }
    Object.assign(product, data);
    return product;
    */

    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Product not found',
      });
    }
    this.products[index] = { ...this.products[index], ...data };
    return this.products[index];
  }

  deleteProduct(id: string) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Product not found',
      });
    }
    const product = this.products[index];
    this.products.splice(index, 1);
    return product;
  }
}
