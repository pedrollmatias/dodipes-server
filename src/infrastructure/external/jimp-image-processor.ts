import { ImageProcessor, TImageDimensions } from '../../domain/shared/image/image-processor';
import Jimp from 'jimp';

export class JimpImageProcessor implements ImageProcessor {
  async getDimensions(image: Buffer): Promise<TImageDimensions> {
    const jimpImage = await Jimp.read(image);

    return {
      height: jimpImage.bitmap.height,
      width: jimpImage.bitmap.width,
    };
  }

  validateAspectRatio(dimensions: TImageDimensions, aspectRatio: number[]): boolean {
    const [aspectRatioWidth, aspectRatioHeight] = aspectRatio;
    const validAspectRatio = aspectRatioWidth / aspectRatioHeight;

    const { width, height } = dimensions;
    const imageAspectRatio = width / height;

    return imageAspectRatio === validAspectRatio;
  }
}
