export class AspectRatioError extends Error {
  constructor({ aspectRatio }: { aspectRatio: number[] }) {
    const [aspectRatioWidth, aspectRatioHeight] = aspectRatio;

    super(`A imagem não tem a proporção esperada de ${aspectRatioWidth}:${aspectRatioHeight}`);

    this.name = 'AspectRatioError';
  }
}
