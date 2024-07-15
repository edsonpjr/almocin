export enum mockOrderStatus {
  inCart = "In Cart",
  inProgress = "In Progress",
  canceled = "Canceled",
  concluded = "Concluded"
}

export class mockItem {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryID: string;
  oldPrice: number;
  description: string;
  timeToPrepare: number;

  constructor(data: mockItem) {
    this.id = data.id
    this.name = data.name;
    this.image = data.image;
    this.price = data.price;
    this.categoryID = data.categoryID;
    this.oldPrice = data.oldPrice;
    this.description = data.description;
    this.timeToPrepare = data.timeToPrepare;
  }
}


export default class mockOrder {
  itemsId: string[];
  id: string;
  userID: string;
  totalPrice: number;
  status: mockOrderStatus;
  totalDeliveryTime: number;
  cep: string;
  address_number: number;

  constructor(data: mockOrder) {
    this.id  = data.id;
    this.itemsId = data.itemsId;
    this.userID = data.userID;
    this.totalPrice = data.totalPrice;
    this.status = data.status;
    this.totalDeliveryTime = data.totalDeliveryTime;
    this.cep = data.cep;
    this.address_number = data.address_number;
  }
}


const order1 = {
  id: '1',
  itemsId: ['item1', 'item2'],
  userID: 'user123',
  totalPrice: 100.50,
  status: mockOrderStatus.concluded,
  totalDeliveryTime: 5,
  cep: '12345-678',
  address_number: 123,
};

const order2 = {
  id: '2',
  itemsId: ['item3','item1'],
  userID: 'user123',
  totalPrice: 100.50,
  status: mockOrderStatus.canceled,
  totalDeliveryTime: 5,
  cep: '12345-678',
  address_number: 123,
};

const order3 = {
  id: '3',
  itemsId: [ 'item2', 'item1','item3'],
  userID: 'user123',
  totalPrice: 100.50,
  status: mockOrderStatus.inProgress,
  totalDeliveryTime: 5,
  cep: '12345-678',
  address_number: 123,
};

const order4 = {
  id: '4',
  itemsId: [ 'item5', 'item1','item3'],
  userID: 'user123',
  totalPrice: 10.50,
  status: mockOrderStatus.inCart,
  totalDeliveryTime: 50,
  cep: '12345-678',
  address_number: 123,
};


const order5 = {
  id: '5',
  itemsId: [ 'item4','item5','item3'],
  userID: 'user123',
  totalPrice: 10.50,
  status: mockOrderStatus.inProgress,
  totalDeliveryTime: 50,
  cep: '12345-678',
  address_number: 123,
};


const item1 = {
  id: "item1",
  name: "maça",
  price: 10,
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/280px-Red_Apple.jpg",
  categoryID: "fruta",
  oldPrice: 10,
  description: "fruta de maca",
  timeToPrepare: 1
};

const item2 = {
  id: "item2",
  name: "bolo de chocolate",
  price: 10,
  image: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSWOjtRJTyt3iHScdM_UazRNQuzKtRH9Fsmn0aHKqGmqhd4mSy4J8CBfqv3BzerJY59",
  categoryID: "massa",
  oldPrice: 100,
  description: "bolo",
  timeToPrepare: 10
};

const item3 = {
  id: 'item3',
  name: "coxinha",
  price: 6,
  image: "https://catracalivre.com.br/wp-content/uploads/2023/05/coxinha-sem-gluten.jpg",
  categoryID: "massa",
  oldPrice: 2,
  description: "salgado",
  timeToPrepare: 110
};

const item4 = {
  id: 'item4',
  name: "brigadeiro",
  price: 63,
  image: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSRAJRjiDEYHinMgUSOClGrRBVtQ0PIJkWfFB-jMav8QEWF9GSjz3nCJNNVGcbbZmtH",
  categoryID: "doce",
  oldPrice: 21,
  description: "brigadeiro de chocolate bem lindo bem gosotos",
  timeToPrepare: 1101
};

const item5 = {
  id: 'item5',
  name: "mandioca",
  price: 163,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEHAekK48hV6b-UpCR_ZvnkDd9wMXY5kKhA&s",
  categoryID: "massa",
  oldPrice: 2,
  description: "salgado",
  timeToPrepare: 110
};


const ord1 = new mockOrder(order1);
const ord2 = new mockOrder(order2);
const ord3 = new mockOrder(order3);
const ord4 = new mockOrder(order4);
const ord5 = new mockOrder(order5);

const it1 = new mockItem(item1);
const it2 = new mockItem(item2);
const it3 = new mockItem(item3);
const it4 = new mockItem(item4);
const it5 = new mockItem(item5);

export const mockOrders  = [ord1,ord2,ord3,ord4,ord5]
export const mockItems  = [it1,it2,it3,it4,it5]
