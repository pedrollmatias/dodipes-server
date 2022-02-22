import { IDomainStore } from '../../../domain/entities/store/store.types';
import { validateRequestUserPermission } from '../../helpers/validate-request-user-permission';
import { StoreRepository } from './store-repository';

export interface IGetStoresByUserRequest {
  params: {
    userId: string;
  };
}

export interface IGetStoresByUserRepositories {
  storeRepository: StoreRepository;
}

export class GetStoresByUser {
  private readonly storeRepository: StoreRepository;

  constructor({ repositories }: { repositories: IGetStoresByUserRepositories }) {
    const { storeRepository } = repositories;

    this.storeRepository = storeRepository;
  }

  handle({ input, requestUserId }: { input: IGetStoresByUserRequest; requestUserId: string }): Promise<IDomainStore[]> {
    const {
      params: { userId },
    } = input;

    validateRequestUserPermission(requestUserId, userId);

    return this.storeRepository.findByUser(userId);
  }
}
