import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  items = [
    {
      id: 1,
      name: 'Burger',
    },
    {
      id: 2,
      name: 'Pizza',
    },
  ];

  getItem(id: number) {
    let item = this.items.find((item) => item.id === id);
    return item;
  }
}
