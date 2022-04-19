import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';
import { ForbiddenError } from '../../application/shared/use-case.errors';
import { IGetStoresByUserOutputDto } from '../../application/use-cases/get-stores-by-user/get-stores-by-user.output-dto';
import { TGetStoresByUserErrors } from '../../application/use-cases/get-stores-by-user/get-stores-by-user.use-case';
import { IMedia } from '../../application/shared/use-case.types';

export class GetStoresByUserPresenter<RepositoryIdType> extends Presenter {
  handle({
    outputDto,
  }: {
    outputDto: Either<TGetStoresByUserErrors, IGetStoresByUserOutputDto<RepositoryIdType>[]>;
  }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.value.constructor) {
        case ForbiddenError:
          return this.forbidden(outputDto.value.message);
        default:
          return this.internalServerError();
      }
    }

    const stores = outputDto.value;
    const responseStores = stores.map((store) => {
      const { logo, coverPhoto } = store;
      const coverPhotoStr = coverPhoto && this.mediaToStringBase64(coverPhoto);
      const logoStr = logo && this.mediaToStringBase64(logo);

      return { ...store, logo: logoStr, coverPhoto: coverPhotoStr };
    });

    return this.success(responseStores);
  }

  private mediaToStringBase64(media: IMedia): string {
    const dataStr = Buffer.from(media.data).toString('base64');

    return `data:${media.mimeType};base64,${dataStr}`;
  }
}
