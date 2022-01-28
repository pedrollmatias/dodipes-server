// import { CustomError, ErrorCodes } from "../custom-error";

import { CustomError, ErrorCodes } from '../shared/custom-error';
import { ImageProcessor } from '../shared/image-processor';
import { IStoreMedia } from './store-data';

export class StoreMedia {
  private readonly logo?: Buffer;

  private readonly coverPhoto?: Buffer;

  constructor(media?: IStoreMedia) {
    this.logo = media?.logo;
    this.coverPhoto = media?.coverPhoto;
  }

  get value(): IStoreMedia {
    return {
      logo: this.logo,
      coverPhoto: this.coverPhoto,
    };
  }

  static async create({
    media,
    imageProcessor,
  }: {
    media?: IStoreMedia;
    imageProcessor: ImageProcessor;
  }): Promise<StoreMedia> {
    if (media?.logo) {
      await StoreMedia.validateImage(media.logo, imageProcessor);
    }

    if (media?.coverPhoto) {
      await StoreMedia.validateImage(media.coverPhoto, imageProcessor);
    }

    return new StoreMedia(media);
  }

  private static async validateImage(image: Buffer, imageProcessor: ImageProcessor): Promise<void> {
    if (!image) {
      return;
    }

    const aspectRatio = [1, 1];

    const dimensions = await imageProcessor.getDimensions(image);

    const isValidAspectRatio = imageProcessor.validateAspectRatio(dimensions, aspectRatio);

    if (!isValidAspectRatio) {
      const [aspectRatioWidth, aspectRatioHeight] = aspectRatio;

      throw <CustomError>{
        statusCode: ErrorCodes.BAD_REQUEST,
        message: `A imagem não tem a proporção esperada de ${aspectRatioWidth}:${aspectRatioHeight}`,
      };
    }
  }
}
