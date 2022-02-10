import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { StoreName } from '../../../domain/entities/store/store-name';
import { IDomainStore } from '../../../domain/entities/store/store.types';
import { TUpdateResponse } from '../../shared/use-case.types';
import { StoreRepository } from './store-repository';

export interface IEditStoreNameRequest {
  params: {
    storeId: string;
  };
  body: {
    name: string;
  };
}

export interface IEditStoreNameRepositories {
  storeRepository: StoreRepository;
}

export class EditStoreName {
  private readonly storeRepository: StoreRepository;

  constructor({ repositories }: { repositories: IEditStoreNameRepositories }) {
    const { storeRepository } = repositories;

    this.storeRepository = storeRepository;
  }

  async handle({ input }: { input: IEditStoreNameRequest }): Promise<TUpdateResponse> {
    const {
      params: { storeId },
      body: { name },
    } = input;

    const findStoreResult = await this.storeRepository.findById(storeId);

    this.validateStoreExistence(findStoreResult);

    StoreName.create({ storeName: name });

    const update = { name };

    return this.storeRepository.updateOne(storeId, update);
  }

  validateStoreExistence(store: IDomainStore | null): void {
    if (!store) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_FOUND,
        message: 'Estabelecimento não encontrado',
      };
    }
  }
}
