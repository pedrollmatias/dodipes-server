// import { Store } from '../../../domain/store/store';
// import { IStoreData } from '../../../domain/store/store-data';
import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { ImageProcessor } from '../../../domain/shared/image-processor';
import { Store } from '../../../domain/store/store';
import { IAddress, IDomainStore, IStoreUser } from '../../../domain/store/store-data';
import { TInsertResponse } from '../../shared/insert-response';
import { UserRepository } from '../user/user-repository';
import { StoreRepository } from './store-repository';

export interface IAddStoreRequest {
  body: {
    userId: string;
    name: string;
    storename: string;
    address: IAddress;
    media?: {
      logo?: Buffer;
      coverPhoto?: Buffer;
    };
  };
}

export class AddStore {
  private readonly storeRepository: StoreRepository;

  private readonly userRepository: UserRepository;

  private readonly imageProcessor: ImageProcessor;

  constructor(storeRepository: StoreRepository, userRepository: UserRepository, imageProcessor: ImageProcessor) {
    this.storeRepository = storeRepository;
    this.userRepository = userRepository;
    this.imageProcessor = imageProcessor;
  }

  async handle(validatedRequest: IAddStoreRequest): Promise<TInsertResponse> {
    const {
      body: { userId, ...storeData },
    } = validatedRequest;

    const now = new Date();

    await this.validateUser(userId);

    const storeUser: IStoreUser = { _id: userId, insertedAt: now, isAdmin: true };
    const storeId = this.storeRepository.getNextId();

    const store = await Store.create(
      {
        ...storeData,
        _id: storeId,
        createdAt: now,
        users: [storeUser],
      },
      this.imageProcessor
    );

    await this.validate(store.value);

    return this.storeRepository.insertOne(store.value);
  }

  private async validateUser(userId: string): Promise<void> {
    const userExists = Boolean(await this.userRepository.findById(userId));

    if (!userExists) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'O usuário não existe',
      };
    }
  }

  private async validate(store: IDomainStore): Promise<void> {
    if (await this.storeRepository.exists({ storename: store.storename })) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'Já existe um estabelecimento com este storename',
      };
    }
  }
}
