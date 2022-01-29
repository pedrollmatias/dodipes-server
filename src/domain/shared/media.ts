import { CustomError, ErrorCodes } from './custom-error';
import { ImageProcessor } from './image-processor';

interface IImageValidationOptions {
  aspectRatio: number[];
}

export class Media {
  static async validateImage(
    image: Buffer,
    imageProcessor: ImageProcessor,
    options: IImageValidationOptions
  ): Promise<void> {
    if (!image) {
      return;
    }

    const { aspectRatio } = options;

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
