import { Injectable } from '@nestjs/common';
import { Product } from './product.schema';
import { TRPCError } from '@trpc/server';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      // Ensure id is not included in the product payload
      const { id, ...productData } = product as any;

      // Create the product entity
      const newProduct = this.productRepository.create(productData);

      // Save the product and handle possible array or single entity return
      const savedResult = await this.productRepository.save(newProduct);

      // Handle the case where save might return an array (shouldn't happen with single entity save, but just in case)
      const savedProduct = Array.isArray(savedResult)
        ? savedResult[0]
        : savedResult;

      if (!savedProduct) {
        throw new Error('Failed to create product');
      }

      // Convert to Product type and return
      return this.mapEntityToProduct(savedProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to create product: ${error.message}`,
      });
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });

      return product ? this.mapEntityToProduct(product) : null;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to fetch product: ${error.message}`,
      });
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productRepository.find();

      // Debug the raw products from the database
      console.log(
        'Raw products from database:',
        JSON.stringify(products, null, 2),
      );

      // If there are no products, return an empty array that matches the expected type
      if (products.length === 0) {
        return [];
      }

      // Map each entity to Product type with proper type conversions
      const mappedProducts = products.map((product) =>
        this.mapEntityToProduct(product),
      );

      return mappedProducts;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to fetch products: ${error.message}`,
      });
    }
  }

  async updateProduct(
    id: string,
    product: Partial<Product>,
  ): Promise<Product | null> {
    try {
      // For updates, make sure we don't try to change the id
      const { id: productId, ...updateData } = product as any;

      await this.productRepository.update(id, updateData);
      const updatedProduct = await this.productRepository.findOne({
        where: { id },
      });

      return updatedProduct ? this.mapEntityToProduct(updatedProduct) : null;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to update product: ${error.message}`,
      });
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to delete product: ${error.message}`,
      });
    }
  }

  // Updated mapping function with proper type handling
  private mapEntityToProduct(entity: ProductEntity): Product {
    // Convert price to number if it's a string (common with decimal columns)
    const price =
      typeof entity.price === 'string'
        ? parseFloat(entity.price)
        : Number(entity.price);

    // Create details object with optional properties
    const details: {
      description?: string;
      rating?: number;
    } = {};

    // If entity.details exists, copy properties with proper type conversion
    if (entity.details) {
      if (entity.details.description !== undefined) {
        details.description = entity.details.description;
      }

      if (entity.details.rating !== undefined) {
        details.rating =
          typeof entity.details.rating === 'string'
            ? parseFloat(entity.details.rating)
            : Number(entity.details.rating);
      }
    }

    const product: Product = {
      id: entity.id,
      name: entity.name,
      price: price,
      details: details,
    };

    // Log the final product object
    console.log('Mapped product:', JSON.stringify(product, null, 2));

    return product;
  }
}
