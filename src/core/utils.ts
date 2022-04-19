import { IMedia } from '../application/shared/use-case.types';

export const stringBase64ToMedia = (stringBase64: string): IMedia => {
  const [info, dataStr] = stringBase64.split(',');
  const [, mimeType] = info.split(':');
  const data = Buffer.from(dataStr, 'base64');

  return { data, mimeType };
};
