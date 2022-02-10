import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { Address } from '../../../domain/entities/store/address';
import { IAddress, IDomainStore } from '../../../domain/entities/store/store.types';
import { TUpdateResponse } from '../../shared/use-case.types';
import { StoreRepository } from './store-repository';

export interface IEditStoreAddressRequest {
  params: {
    storeId: string;
  };
  body: IAddress;
}

export interface IEditStoreAddressRepositories {
  storeRepository: StoreRepository;
}

export class EditStoreAddress {
  private readonly storeRepository: StoreRepository;

  constructor({ repositories }: { repositories: IEditStoreAddressRepositories }) {
    const { storeRepository } = repositories;

    this.storeRepository = storeRepository;
  }

  async handle({ input }: { input: IEditStoreAddressRequest }): Promise<TUpdateResponse> {
    const {
      params: { storeId },
      body: address,
    } = input;

    const findStoreResult = await this.storeRepository.findById(storeId);

    this.validateStoreExistence(findStoreResult);

    Address.create({ address });

    const update = { address };

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
