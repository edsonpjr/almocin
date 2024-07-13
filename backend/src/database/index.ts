import ItemMenuEntity from '../entities/item-menu.entity';
import OrderEntity from '../entities/order.entity';
import { OrderStatus } from '../types/order';

export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;

  private constructor() {
    this.data = {};
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static reset() {
    Database.instance = new Database();
  }

  static seed() {
    const items = [
      'Batata',
      'Arroz',
      'Feijão',
      'Bife',
      'Frango',
      'Peixe',
      'Salada',
      'Macarrão',
      'Pizza',
      'Hambúrguer'
    ];

    const categories = [
      { id: 'category-id-0', name: 'Bebida' },
      { id: 'category-id-1', name: 'Sobremesa' },
      { id: 'category-id-2', name: 'Vegetariano' },
      { id: 'category-id-3', name: 'Vegano' },
      { id: 'category-id-4', name: 'Sem Glúten' },
      { id: 'category-id-5', name: 'Sem Lactose' },
      { id: 'category-id-6', name: 'Fitness' },
      { id: 'category-id-7', name: 'Gourmet' }
    ]

    const users = [
      { id: 'user-id-0', name: 'João' },
      { id: 'user-id-1', name: 'Maria' },
      { id: 'user-id-2', name: 'José' }
    ]

    const linkItemsCategories = items.map(() => (
      categories[Math.floor(Math.random() * categories.length)].id
    ))

    function getRandomItemsIds() {
      const itemsIds = [];
      const itemsLength = Math.floor(Math.random() * items.length) + 1; // 1 - 10
      for (let i = 0; i < itemsLength; i++) {
        itemsIds.push(`item-id-${Math.floor(Math.random() * items.length)}`);
      }
      return itemsIds;
    }

    Database.getInstance().data = {
      menu: items.map((item, index) => new ItemMenuEntity({
        id: `item-id-${index}`,
        name: item,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
        description: `Descrição do ${item}`,
        image: `${item.toLowerCase()}.png`,
        categoryID: linkItemsCategories[index],
        oldPrice: Math.floor(Math.random() * 10), // 0 - 9
        price: Math.floor(Math.random() * 10) + 1, // 1 - 10
        timeToPrepare: Math.floor(Math.random() * 60) + 15, // 15 - 75 minutes
      })),

      category: categories.map((category) => ({
        ...category,
        createdAt: new Date(),
        active: linkItemsCategories.includes(category.id) ?? Math.random() > 0.5
      })),

      order: items.map((item, index) => new OrderEntity({
        itemsId: getRandomItemsIds(),
        userID: users[Math.floor(Math.random() * users.length)].id,
        id: `pedido-id-${index}`,
        totalPrice: Math.floor(Math.random() * 10), // 0 - 9
        status: OrderStatus.inProgress,
        totalDeliveryTime: Math.floor(Math.random() * 60) + 15, // 15 - 75 minutes,
        cep: "12345-678",
        address_number: Math.floor(Math.random() * 999) + 1, // 1 - 1000 address number
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      })),
      
      user: users.map((user) => ({
        ...user,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      })),
    };
  }
}
