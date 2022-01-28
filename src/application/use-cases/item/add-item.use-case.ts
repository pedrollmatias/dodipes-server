import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { Item } from '../../../domain/item/item';
import { IItemData } from '../../../domain/item/item-data';
import { CategoryRepository } from '../category/category-repository';
import { ItemRepository } from './item-repository';

interface IAddItemData extends IItemData {
  categoryId: string;
}

export class AddItem {
  private readonly itemRepository: ItemRepository;

  private readonly categoryRepository: CategoryRepository;

  constructor(
    itemRepository: ItemRepository,
    categoryRepository: CategoryRepository
  ) {
    this.itemRepository = itemRepository;
    this.categoryRepository = categoryRepository;
  }

  async handle(itemData: IAddItemData) {
    await this.validateCategory(itemData.categoryId);

    const item = Item.create(itemData);

    return this.itemRepository.insertOne(item, itemData.categoryId);
  }

  private async validateCategory(categoryId: string) {
    if (!(await this.categoryRepository.exists({ _id: categoryId }))) {
      throw <CustomError>{
        statusCode: ErrorCodes.BAD_REQUEST,
        message: `A cateogoria do item não existe (${categoryId})`,
      };
    }
  }
}
