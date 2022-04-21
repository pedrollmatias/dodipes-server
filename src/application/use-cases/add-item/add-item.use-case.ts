import { Either, left, right } from '../../../core/either';
import { stringBase64ToBuffer } from '../../../core/utils';
import { Item, TItemErrors } from '../../../domain/entities/item/item';
import { ImageProcessor } from '../../../domain/shared/image/image-processor';
import { CategoryRepository } from '../../repositories/category-repository';
import { ItemRepository } from '../../repositories/item-repository';
import { StoreRepository } from '../../repositories/store-repository';
import { IInsertionDTO } from '../../shared/output-dto';
import { UseCase } from '../../shared/use-case';
import { ForbiddenError, ResourceNotFoundError } from '../../shared/use-case.errors';
import { IAddItemInputDTO } from './add-item.input-dto';

export interface IAddItemRepositories<RepositoryIdType> {
  itemRepository: ItemRepository<RepositoryIdType>;
  categoryRepository: CategoryRepository<RepositoryIdType>;
  storeRepository: StoreRepository<RepositoryIdType>;
}

export interface IAddItemExternalInterfaces {
  imageProcessor: ImageProcessor;
}

export type TAddItemErrors = TItemErrors | ResourceNotFoundError | ForbiddenError;

export class AddItem<RepositoryIdType> extends UseCase<IAddItemInputDTO, IInsertionDTO<RepositoryIdType>> {
  private readonly storeRepository: StoreRepository<RepositoryIdType>;

  private readonly categoryRepository: CategoryRepository<RepositoryIdType>;

  private readonly itemRepository: ItemRepository<RepositoryIdType>;

  private imageProcessor: ImageProcessor;

  constructor({
    repositories,
    externalInterfaces,
  }: {
    repositories: IAddItemRepositories<RepositoryIdType>;
    externalInterfaces: IAddItemExternalInterfaces;
  }) {
    super();
    const { itemRepository, categoryRepository, storeRepository } = repositories;
    const { imageProcessor } = externalInterfaces;

    this.storeRepository = storeRepository;
    this.categoryRepository = categoryRepository;
    this.itemRepository = itemRepository;
    this.imageProcessor = imageProcessor;
  }

  async handle({ inputDto }: { inputDto: IAddItemInputDTO }): Promise<Either<Error, IInsertionDTO<RepositoryIdType>>> {
    const itemData = inputDto;

    const userId = this.itemRepository.stringToId(itemData.userId);
    const storeId = this.storeRepository.stringToId(itemData.storeId);
    const store = await this.storeRepository.findByIdAndUserId(storeId, userId);

    if (!store) {
      return left(new ForbiddenError());
    }

    const categoryId = this.categoryRepository.stringToId(itemData.categoryId);
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      return left(new ResourceNotFoundError({ message: `Categoria não encontrada: ${itemData.categoryId}.` }));
    }

    const itemId = this.itemRepository.getNextId();
    const mediaBuffer = itemData.media ? stringBase64ToBuffer(itemData.media) : undefined;

    const itemOrError = await Item.create({
      data: {
        ...itemData,
        _id: this.itemRepository.idToString(itemId),
        createdAt: new Date(),
        active: itemData.active ?? true,
        media: mediaBuffer,
      },
      imageProcessor: this.imageProcessor,
    });

    if (itemOrError.isLeft()) {
      return left(itemOrError.value);
    }

    const itemInstace = itemOrError.value;

    const insertedResult = await this.itemRepository.insertOne({
      ...itemInstace.value,
      _id: itemId,
      categoryId,
      media: itemData.media,
    });

    return right(insertedResult);
  }
}
