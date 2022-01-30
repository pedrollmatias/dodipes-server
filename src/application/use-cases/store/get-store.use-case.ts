import { IDomainStore } from '../../../domain/store/store.types';
import { StoreRepository } from './store-repository';

export interface IGetStoreRepositories {
  storeRepository: StoreRepository;
}

export interface IGetStoreRequest {
  params: {
    storeId: string;
  };
}

export class GetStore {
  private readonly storeRepository: StoreRepository;

  constructor({ repositories }: { repositories: IGetStoreRepositories }) {
    const { storeRepository } = repositories;

    this.storeRepository = storeRepository;
  }

  handle({ input }: { input: IGetStoreRequest }): Promise<IDomainStore | null> {
    const {
      params: { storeId },
    } = input;

    return this.storeRepository.findById(storeId);
  }
}
