import { Binary } from 'mongodb';

interface IMedia {
  data: Binary;
  mimeType: string;
}

export const stringBase64ToMedia = (stringBase64: string): IMedia => {
  const [info, dataStr] = stringBase64.split(',');
  const [, mimeType] = info.split(':');
  const data = new Binary(Buffer.from(dataStr, 'base64'));

  return { data, mimeType };
};

export const stringBase64ToBuffer = (stringBase64: string): Buffer => {
  const [, dataStr] = stringBase64.split(',');

  return Buffer.from(dataStr, 'base64');
};

export const mediaToStringBase64 = (media: IMedia): string => {
  const dataStr = Buffer.from(media.data.buffer).toString('base64');

  return `data:${media.mimeType},${dataStr}`;
};
