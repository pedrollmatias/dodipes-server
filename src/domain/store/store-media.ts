// import { CustomError, ErrorCodes } from "../custom-error";

// interface IImageDimensions {
//   width: number;
//   height: number;
// }

// interface IImageProcessor {
//   getDimensions: (buffer: Buffer) => Promise<IImageDimensions>;
//   getSize: (buffer: Buffer) => Promise<number>;
//   validateAspectRatio: (
//     dimensions: IImageDimensions,
//     aspectRatio: number[]
//   ) => Boolean;
//   validateSize: (
//     sizeInBytes: Number,
//     {
//       minSizeInBytes,
//       maxSizeInBytes,
//     }: {
//       minSizeInBytes?: number;
//       maxSizeInBytes: number;
//     }
//   ) => Promise<Boolean>;
// }

interface IStoreMediaData {
  logo: Buffer;
  coverPhoto: Buffer;
}

export class StoreMedia {
  public readonly logo: Buffer;

  public readonly coverPhoto: Buffer;
  // public readonly imageProcessor: IImageProcessor;

  constructor(media: IStoreMediaData) {
    this.logo = media.logo;
    this.coverPhoto = media.coverPhoto;
    // this.imageProcessor = imageProcessor;
  }

  static create(media: IStoreMediaData): StoreMedia {
    return new StoreMedia(media);
  }

  // static async validateImage(image: Buffer) {
  //   const aspectRatio = [1, 1];
  //   const [aspectRatioWidth, aspectRatioHeight] = aspectRatio;

  //   const dimensions = await this.imageProcessor.getDimensions(image);
  //   const isValidAspectRation = this.imageProcessor.validateAspectRatio(
  //     dimensions,
  //     aspectRatio
  //   );

  //   if (!isValidAspectRation) {
  //     throw <CustomError>{
  //       statusCode: ErrorCodes.BAD_REQUEST,
  //       message: `A imagem não tem a proporção esperada de ${aspectRatioWidth}:${aspectRatioHeight}`,
  //     };
  //   }

  //   const imageSizeInBytes = await this.imageProcessor.getSize(image);

  //   const megaBytes = 1000000;
  //   const minSizeInBytes = undefined;
  //   const maxSizeInBytes = 30 * megaBytes;
  //   const isValidSize = this.imageProcessor.validateSize(imageSizeInBytes, {
  //     minSizeInBytes,
  //     maxSizeInBytes,
  //   });

  //   if (!isValidSize) {
  //     throw <CustomError>{
  //       statusCode: ErrorCodes.BAD_REQUEST,
  //       message: `A imagem não tem a proporção esperada de ${aspectRatioWidth}:${aspectRatioHeight}`,
  //     };
  //   }
  // }

  // // TODO: Move to controller
  // validateAspectRatio(
  //   dimensions: IImageDimensions,
  //   aspectRatio: number[]
  // ): Boolean {
  //   const [aspectRatioWidth, aspectRatioHeight] = aspectRatio;
  //   const validAspectRatio = aspectRatioWidth / aspectRatioHeight;

  //   const { width, height } = dimensions;
  //   const imageAspectRatio = width / height;

  //   return imageAspectRatio !== validAspectRatio;
  // }
}
