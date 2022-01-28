// import { Store } from '../../../domain/store/store';
// import { IStoreData } from '../../../domain/store/store-data';
import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { ImageProcessor } from '../../../domain/shared/image-processor';
import { Store } from '../../../domain/store/store';
import { IAddress, IDomainStore, IStoreUser } from '../../../domain/store/store-data';
import { TInsertResponse } from '../../shared/insert-response';
import { UserRepository } from '../user/user-repository';
import { StoreRepository } from './store-repository';

export interface IAddStoreInput {
  body: {
    name: string;
    storename: string;
    address: IAddress;
    media?: {
      logo?: Buffer;
      coverPhoto?: Buffer;
    };
    users: string[];
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

  async handle(storeInput: IAddStoreInput): Promise<TInsertResponse> {
    const { body } = storeInput;

    const now = new Date();

    const storeUsers = body.users.map((_id: string): IStoreUser => ({ _id, insertedAt: now, isAdmin: true }));

    await this.validateStoreUsers(storeUsers);

    const storeId = this.storeRepository.getNextId();

    const store = await Store.create(
      {
        ...body,
        _id: storeId,
        createdAt: now,
        users: storeUsers,
      },
      this.imageProcessor
    );

    await this.validate(store.value);

    return this.storeRepository.insertOne(store.value);
  }

  private async validateStoreUsers(storeUsers: IStoreUser[]): Promise<void> {
    if (storeUsers.length > 1) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'Não é possível criar um estabelecimento com mais de um usuário',
      };
    }

    const [user] = storeUsers;

    const userExists = Boolean(await this.userRepository.findById(user._id));

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
