import { Either, left, right } from '../../../core/either';
import { StoreUser, TStoreUserErrors } from '../../../domain/entities/store-user/store-user';
import { Store, TStoreErrors } from '../../../domain/entities/store/store';
import { ImageProcessor } from '../../../domain/shared/image/image-processor';
import { StoreRepository } from '../../repositories/store-repository';
import { UserRepository } from '../../repositories/user-repository';
import { UseCase } from '../../shared/use-case';
import { IAddStoreInputDTO } from './add-store.input-dto';
import { ResourceNotFoundError } from '../../shared/use-case.errors';
import { IInsertionDTO } from '../../shared/output-dto';
import { stringBase64ToBuffer } from '../../../core/utils';

export interface IAddStoreRepositories<RepositoryIdType> {
  storeRepository: StoreRepository<RepositoryIdType>;
  userRepository: UserRepository<RepositoryIdType>;
}

export interface IAddStoreExternalInterfaces {
  imageProcessor: ImageProcessor;
}

export type TAddStoreErrors = TStoreErrors | TStoreUserErrors | ResourceNotFoundError;

export class AddStore<RepositoryIdType> extends UseCase<IAddStoreInputDTO, IInsertionDTO<RepositoryIdType>> {
  private readonly storeRepository: StoreRepository<RepositoryIdType>;

  private readonly userRepository: UserRepository<RepositoryIdType>;

  private readonly imageProcessor: ImageProcessor;

  constructor({
    repositories,
    externalInterfaces,
  }: {
    repositories: IAddStoreRepositories<RepositoryIdType>;
    externalInterfaces: IAddStoreExternalInterfaces;
  }) {
    super();
    const { storeRepository, userRepository } = repositories;
    const { imageProcessor } = externalInterfaces;

    this.storeRepository = storeRepository;
    this.userRepository = userRepository;
    this.imageProcessor = imageProcessor;
  }

  async handle({ inputDto }: { inputDto: IAddStoreInputDTO }): Promise<Either<Error, IInsertionDTO<RepositoryIdType>>> {
    const storeData = inputDto;
    const storeId = this.storeRepository.getNextId();

    const coverPhotoBuffer = storeData.coverPhoto ? stringBase64ToBuffer(storeData.coverPhoto) : undefined;
    const logoBuffer = storeData.logo ? stringBase64ToBuffer(storeData.logo) : undefined;

    const storeOrError = await Store.create({
      data: {
        _id: this.storeRepository.idToString(storeId),
        address: storeData.address,
        createdAt: new Date(),
        name: storeData.name,
        storename: storeData.storename,
        coverPhoto: coverPhotoBuffer,
        logo: logoBuffer,
      },
      imageProcessor: this.imageProcessor,
    });

    if (storeOrError.isLeft()) {
      return left(storeOrError.value);
    }

    const userId = this.userRepository.stringToId(storeData.userId);
    const user = this.userRepository.findOneById(userId);

    if (!user) {
      return left(new ResourceNotFoundError({ message: `Usuário não encontrado ${storeData.userId}.` }));
    }

    const storeUserOrError = StoreUser.create({
      data: {
        _id: storeData.userId,
        insertedAt: new Date(),
        storeId: this.storeRepository.idToString(storeId),
        isAdmin: true,
        isFounder: true,
      },
    });

    if (storeUserOrError.isLeft()) {
      return left(storeUserOrError.value);
    }

    const storeInstance = storeOrError.value;
    const store = storeInstance.value;
    const storeUserInstance = storeUserOrError.value;
    const storeUser = storeUserInstance.value;

    const insertedResult = await this.storeRepository.insertOne(
      { ...store, _id: storeId, logo: storeData.logo, coverPhoto: storeData.coverPhoto },
      { _id: userId, insertedAt: storeUser.insertedAt, isAdmin: true }
    );

    return right(insertedResult);
  }
}
