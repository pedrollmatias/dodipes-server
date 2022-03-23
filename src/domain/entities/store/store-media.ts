import { ImageProcessor } from '../../shared/image/image-processor';
import { Image, TImageErrors } from '../../shared/image/image';
import { IStoreMedia } from './store.types';
import { ValueObject } from '../../shared/value-object';
import { Either, left, right } from '../../../core/either';

interface IStoreMediaProps {
  coverPhoto?: Image;
  logo?: Image;
}

export type TStoreMediaErrors = TImageErrors;

export class StoreMedia extends ValueObject<IStoreMediaProps> {
  get value(): IStoreMedia {
    return {
      coverPhoto: this.props.coverPhoto?.value,
      logo: this.props.logo?.value,
    };
  }

  static async create({
    media,
    imageProcessor,
  }: {
    media?: IStoreMedia;
    imageProcessor: ImageProcessor;
  }): Promise<Either<TStoreMediaErrors, StoreMedia>> {
    let storeMediaData: IStoreMediaProps = {};
    const aspectRatio = [1, 1];

    if (media?.coverPhoto) {
      const { coverPhoto } = media;
      const coverPhotoOrError = await Image.create({
        image: coverPhoto,
        imageProcessor,
        validationOptions: { aspectRatio },
      });

      if (coverPhotoOrError.isLeft()) {
        return left(coverPhotoOrError.value);
      }

      storeMediaData = { ...storeMediaData, coverPhoto: coverPhotoOrError.value };
    }

    if (media?.logo) {
      const { logo } = media;
      const logoOrError = await Image.create({
        image: logo,
        imageProcessor,
        validationOptions: { aspectRatio },
      });

      if (logoOrError.isLeft()) {
        return left(logoOrError.value);
      }

      storeMediaData = { ...storeMediaData, logo: logoOrError.value };
    }

    return right(new StoreMedia(storeMediaData));
  }
}
