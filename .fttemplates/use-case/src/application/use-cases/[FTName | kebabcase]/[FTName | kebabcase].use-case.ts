import { Either, left, right } from '../../../core/either';
import { UseCase } from '../../shared/use-case';
import { I<FTName | pascalCase>InputDTO } from './<FTName | kebabcase>.input-dto';
import { I<FTName | pascalCase>OutputDTO } from './<FTName | kebabcase>.output-dto';

export interface I<FTName | pascalCase>Repositories<RepositoryIdType> {
  repository: Repository<RepositoryIdType>;
}

export type T<FTName | pascalCase>Errors = Errors;

export class <FTName | pascalCase><RepositoryIdType> extends UseCase<I<FTName | pascalCase>InputDTO, I<FTName | pascalCase>OutputDTO> {
  private readonly repository: Repository<RepositoryIdType>;
  constructor({ repositories }: { repositories: IAddStoreRepositories<RepositoryIdType> }) {
    super();
    const { repository } = repositories;

    this.repository = repository;
  }

  async handle({ inputDto }: { inputDto: I<FTName | pascalCase>InputDTO }): Promise<Either<T<FTName | pascalCase>Errors, I<FTName | pascalCase>OutputDTO>> {
    return right(insertedResult);
  }
}
