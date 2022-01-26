import { CustomError, ErrorCodes } from "../custom-error";
import { IItemData } from "./item-data";

export class Item {
  public readonly name: string;
  public readonly description?: string;
  public readonly price: number;
  public readonly active?: boolean;
  public readonly media?: Buffer[];

  private constructor(item: IItemData) {
    this.name = item.name;
    this.description = item.description;
    this.price = item.price;
    this.active = item.active;
    this.media = item.media;

    Object.freeze(this);
  }

  static create(item: IItemData): Item {
    Item.validate(item);

    return new Item(item);
  }

  private static validate(item: IItemData): void {
    if (!item.name) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: "O nome do item não pode ser vazio.",
      };
    }

    if (!item.price) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: "O preço do item não pode ser vazio.",
      };
    }

    if (item.price <= 0) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: "O preço do item precisa ser positivo.",
      };
    }
  }
}
