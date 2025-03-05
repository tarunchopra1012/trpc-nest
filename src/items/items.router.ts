import { Input, Query, Router } from 'nestjs-trpc';
import { ItemsService } from './items.service';
import { z } from 'zod';
import { itemSchema } from './item.schema';

@Router({
  alias: 'items',
})
export class ItemsRouter {
  constructor(private readonly itemsService: ItemsService) {}

  @Query({
    input: z.object({ id: z.number() }),
    output: itemSchema,
  })
  getItem(@Input('id') id: number) {
    return this.itemsService.getItem(id);
  }
}
