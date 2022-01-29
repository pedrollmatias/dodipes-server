import { ImageProcessor } from '../shared/image-processor';
import { Media } from '../shared/media';
import { IStoreMedia } from './store.types';

export class StoreMedia extends Media {
  private readonly logo?: Buffer;

  private readonly coverPhoto?: Buffer;

  constructor(media?: IStoreMedia) {
    super();
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
      const aspectRatio = [1, 1];

      await StoreMedia.validateImage(media.logo, imageProcessor, { aspectRatio });
    }

    if (media?.coverPhoto) {
      const aspectRatio = [1, 1];

      await StoreMedia.validateImage(media.coverPhoto, imageProcessor, { aspectRatio });
    }

    return new StoreMedia(media);
  }
}
