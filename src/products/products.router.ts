import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { ProductsService } from './products.service';
import { Product, productSchema } from './product.schema';
import { z } from 'zod';

@Router({
  alias: 'products',
})
export class ProductsRouter {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Get product by id
   * @param id string
   * @returns product
   */
  @Query({
    input: z.object({ id: z.string() }),
    output: productSchema,
  })
  getProductById(@Input('id') id: string) {
    return this.productsService.getProductById(id);
  }

  /**
   * Get all products
   * @returns product[]
   */
  @Query({
    output: z.array(productSchema),
  })
  getProducts() {
    return this.productsService.getAllProducts();
  }

  /**
   * Create Product
   * @param productData Product
   * @returns product
   */
  @Mutation({
    input: productSchema,
    output: productSchema,
  })
  createProduct(@Input() productData: Product) {
    return this.productsService.createProduct(productData);
  }

  /**
   * Update Product
   * @param productData Product
   * @returns product
   */
  @Mutation({
    input: z.object({
      id: z.string(),
      data: productSchema.partial(),
    }),
    output: productSchema,
  })
  updateProduct(
    @Input('id') id: string,
    @Input('data') data: Partial<Product>,
  ) {
    // const productData = { id, ...data };
    return this.productsService.updateProduct(id, data);
  }

  /**
   * Delete Product
   * @param id string
   * @returns product
   */
  @Mutation({
    input: z.object({ id: z.string() }),
    output: z.boolean(),
  })
  deleteProduct(@Input('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
