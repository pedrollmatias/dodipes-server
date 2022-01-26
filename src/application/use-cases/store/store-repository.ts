export abstract class StoreRepository {
  abstract exists(query: any): Promise<boolean>;
  abstract findOne(query: any): Promise<boolean>;
}
