export abstract class Repository<RepositoryIdType> {
  abstract getNextId(): RepositoryIdType;

  abstract idToString(id: RepositoryIdType): string;

  abstract stringToId(id: string): RepositoryIdType;
}
