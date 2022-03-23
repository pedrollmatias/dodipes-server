export type TImageDimensions = { width: number; height: number };

export abstract class ImageProcessor {
  abstract getDimensions(image: Buffer): Promise<TImageDimensions> | TImageDimensions;

  abstract validateAspectRatio(dimensions: TImageDimensions, aspectRatrio: number[]): Promise<boolean> | boolean;
}
