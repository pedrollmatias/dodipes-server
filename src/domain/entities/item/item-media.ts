// import { CustomError, ErrorCodes } from "../custom-error";

import { ImageProcessor } from '../../shared/image-processor';
import { Media } from '../../shared/media';

export class ItemMedia extends Media {
  private readonly media?: Buffer;

  constructor(media?: Buffer) {
    super();
    this.media = media;
  }

  get value(): Buffer | undefined {
    return this.media;
  }

  static async create({ media, imageProcessor }: { media?: Buffer; imageProcessor: ImageProcessor; }): Promise<ItemMedia> {
    const aspectRatio = [1, 1];

    if (media) {
      await ItemMedia.validateImage(media, imageProcessor, { aspectRatio });
    }

    return new ItemMedia(media);
  }
}
