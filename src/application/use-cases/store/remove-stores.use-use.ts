import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { IDomainStore } from '../../../domain/entities/store/store.types';
import { TRemoveResponse } from '../../shared/use-case.types';
import { StoreRepository } from './store-repository';

export interface IRemoveStoreRequest {
  params: {
    storeId: string;
  };
  body: {
    userId: string;
  };
}

export interface IRemoveStoreRepositories {
  storeRepository: StoreRepository;
}

export class RemoveStore {
  private readonly storeRepository: StoreRepository;

  constructor({ repositories }: { repositories: IRemoveStoreRepositories }) {
    const { storeRepository } = repositories;

    this.storeRepository = storeRepository;
  }

  async handle({ input }: { input: IRemoveStoreRequest }): Promise<TRemoveResponse> {
    const {
      params: { storeId },
      body: { userId },
    } = input;

    const findStoreResult = await this.storeRepository.findById(storeId);

    this.validateStoreExistence(findStoreResult);

    const store = <IDomainStore>findStoreResult;

    this.validateRemoval(store, userId);

    return this.storeRepository.deleteOne(storeId);
  }

  validateStoreExistence(store: IDomainStore | null): void {
    if (!store) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_FOUND,
        message: 'Estabelecimento não encontrado',
      };
    }
  }

  validateRemoval(store: IDomainStore, userId: string): void {
    // TODO: remover apenas se não tiver pedidos

    const { users } = store;

    const adminUser = users.find(({ isAdmin }) => isAdmin);

    if (!adminUser) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'Usuário administrador não encontrado',
      };
    }

    if (adminUser?._id !== userId) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'Apenas o usuário administrador pode remover o estabelecimento.',
      };
    }
  }
}
