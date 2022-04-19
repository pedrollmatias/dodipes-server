export interface IBody {
  name: string;
  description?: string;
  price: number;
  active?: boolean;
  media?: string;
}

export interface IParams {
  categoryId: string;
  storeId: string;
}

export interface IResponse {
  insertedId: string;
}
