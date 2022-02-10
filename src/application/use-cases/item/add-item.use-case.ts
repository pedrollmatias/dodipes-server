import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { Item } from '../../../domain/entities/item/item';
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

export interface IAddItemRepositories {
  itemRepository: ItemRepository;
  categoryRepository: CategoryRepository;
}

export interface IAddItemExternalInterfaces {
  imageProcessor: ImageProcessor;
}

export class AddItem {
  private readonly itemRepository: ItemRepository;

  private readonly categoryRepository: CategoryRepository;

  private readonly imageProcessor: ImageProcessor;

  constructor({
    repositories,
    externalInterfaces,
  }: {
    repositories: IAddItemRepositories;
    externalInterfaces: IAddItemExternalInterfaces;
  }) {
    const { categoryRepository, itemRepository } = repositories;
    const { imageProcessor } = externalInterfaces;

    this.itemRepository = itemRepository;
    this.categoryRepository = categoryRepository;
    this.imageProcessor = imageProcessor;
  }

  async handle({ input }: { input: IAddItemRequest }) {
    const {
      body: itemData,
      params: { storeId, categoryId },
    } = input;

    const itemId = this.itemRepository.getNextId();

    await this.validateCategory(storeId, categoryId);

    const now = new Date();
    const item = await Item.create({
      data: {
        ...itemData,
        _id: itemId,
        createdAt: now,
      },
      imageProcessor: this.imageProcessor,
    });

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
