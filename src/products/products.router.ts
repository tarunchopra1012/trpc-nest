import { Mutation, Router } from 'nestjs-trpc';

@Router({
  alias: 'products',
})
export class ProductsRouter {
  @Mutation()
  createProduct() {}
}
