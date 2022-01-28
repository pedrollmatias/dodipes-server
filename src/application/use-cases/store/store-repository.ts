export abstract class StoreRepository {
  abstract exists(query: unknown): Promise<boolean>;

  abstract findOne(query: unknown): Promise<boolean>;
}
