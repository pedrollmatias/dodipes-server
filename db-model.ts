interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  bornDate: string;
  sex: string;
  passwordHash: string;
  createdAt: Date;
  modifiedAt: Date;
}

interface Address {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Store {
  name: string;
  storename: string;
  address: Address;
  media: {
    logo: Buffer;
    coverPhoto: Buffer;
  };
  categories: Category[];
  createdAt: Date;
  modifiedAt: Date;
  users: {
    _id: string;
    insertedAt: Date;
    isAdmin: boolean;
  }[]
}

interface Item {
  name: string;
  description: string;
  price: number;
  active: boolean;
  media: Buffer[];
  createdAt: Date;
  modifiedAt: Date;
}

interface Category {
  name: string;
  active: boolean;
  items: Item[];
  createdAt: Date;
  modifiedAt: Date;
}

interface OrderItem extends Item {
  observation?: string;
  amount: number;
}

interface StoreOrder {
  item: OrderItem;
  table: number;
  dateTime: Date;
  status: string;
}

interface BillItem extends OrderItem {
  participantsIds: string[];
}

interface BillOrder {
  items: BillItem[];
  createdAt: Date;
  canceled: boolean;
}

interface Partcipant {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface Expense {
  name: string;
  participants: Partcipant[];
}

interface Bill {
  storeId: string;
  createdAt: Date;
  participants: Partcipant[];
  orders: BillOrder[]
  expenses: Expense
}
