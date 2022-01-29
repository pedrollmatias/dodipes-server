import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { Item } from '../../../domain/item/item';
import { CategoryRepository } from '../category/category-repository';
import { ItemRepository } from './item-repository';
import { ImageProcessor } from '../../../domain/shared/image-processor';

export interface IAddItemRequest {
  params: {
    storeId: string;
    categoryId: string;
  };
  body: {
    name: string;
    description?: string;
    price: number;
    active?: boolean;
    media?: Buffer;
  };
}

export class AddItem {
  private readonly itemRepository: ItemRepository;

  private readonly categoryRepository: CategoryRepository;

  private readonly imageProcessor: ImageProcessor;

  constructor(itemRepository: ItemRepository, categoryRepository: CategoryRepository, imageProcessor: ImageProcessor) {
    this.itemRepository = itemRepository;
    this.categoryRepository = categoryRepository;
    this.imageProcessor = imageProcessor;
  }

  async handle(validatedRequest: IAddItemRequest) {
    const {
      body: itemData,
      params: { storeId, categoryId },
    } = validatedRequest;

    const itemId = this.itemRepository.getNextId();

    await this.validateCategory(storeId, categoryId);

    const now = new Date();
    const item = await Item.create(
      {
        ...itemData,
        _id: itemId,
        createdAt: now,
      },
      this.imageProcessor
    );

    return this.itemRepository.insertOne(storeId, categoryId, item.value);
  }

  private async validateCategory(storeId: string, categoryId: string) {
    const category = await this.categoryRepository.findById(storeId, categoryId);

    if (!category) {
      throw <CustomError>{
        statusCode: ErrorCodes.BAD_REQUEST,
        message: `A cateogoria do item não existe (${categoryId})`,
      };
    }
  }
}
