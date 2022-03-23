import { Either, left, right } from '../../../core/either';
import { ImageProcessor } from './image-processor';
import { ValueObject } from '../value-object';
import { AspectRatioError } from './image.errors';

interface IImageValidationOptions {
  aspectRatio: number[];
}

interface IImageProps {
  image: Buffer;
}

export type TImageErrors = AspectRatioError;

export class Image extends ValueObject<IImageProps> {
  get value(): Buffer {
    return this.props.image;
  }

  static async create({
    image,
    imageProcessor,
    validationOptions,
  }: {
    image: Buffer;
    imageProcessor: ImageProcessor;
    validationOptions: IImageValidationOptions;
  }): Promise<Either<TImageErrors, Image>> {
    const isValidImageOrError = await this.validate({
      image,
      imageProcessor,
      validationOptions,
    });

    if (isValidImageOrError.isLeft()) {
      return left(isValidImageOrError.value);
    }

    return right(new Image({ image }));
  }

  private static async validate({
    image,
    imageProcessor,
    validationOptions,
  }: {
    image: Buffer;
    imageProcessor: ImageProcessor;
    validationOptions: IImageValidationOptions;
  }): Promise<Either<AspectRatioError, boolean>> {
    const { aspectRatio } = validationOptions;
    const dimensions = await imageProcessor.getDimensions(image);
    const isValidAspectRatio = imageProcessor.validateAspectRatio(dimensions, aspectRatio);

    if (!isValidAspectRatio) {
      return left(new AspectRatioError({ aspectRatio }));
    }

    return right(true);
  }
}
