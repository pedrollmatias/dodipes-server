import { I<FTName | pascalCase>OutputDTO, T<FTName | pascalCase>Errors } from '../../application/use-cases/<FTName | kebabcase>/<FTName | kebabcase>.output-dto';
import { I<FTName | pascalCase>Errors } from '../../application/use-cases/<FTName | kebabcase>/<FTName | kebabcase>.use-case';
import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class <FTName | pascalCase>Presenter<RepositoryIdType> extends Presenter {
  handle({ outputDto }: { outputDto: Either<T<FTName | pascalCase>Errors, I<FTName | pascalCase>OutputDTO<RepositoryIdType>> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.constructor) {
        default:
          return this.internalServerError();
      }
    }

    return this.success(outputDto.value);
  }
}
