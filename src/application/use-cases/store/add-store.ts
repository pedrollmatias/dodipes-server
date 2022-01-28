// import { Store } from '../../../domain/store/store';
// import { IStoreData } from '../../../domain/store/store-data';
import { StoreRepository } from './store-repository';

export class AddStore {
  private readonly storeRepository: StoreRepository;

  constructor(userRepo: StoreRepository) {
    this.storeRepository = userRepo;
  }

  // handle(storeData: IStoreData) {
  //   Store.create(storeData);
  // }
}
