import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get(':id')
  getItem(@Param('id') id: string) {
    return this.itemsService.getItem(+id);
  }
}
