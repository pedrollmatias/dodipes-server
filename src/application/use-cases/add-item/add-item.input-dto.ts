export interface IAddItemInputDTO {
  storeId: string;
  userId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  active?: boolean;
  media?: string;
}
