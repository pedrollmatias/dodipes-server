export abstract class TokenHanlder {
  abstract sign(payload: object, options: object): string;

  abstract verify(token: string, key: Buffer | string | object): Promise<object> | object | Promise<string> | string;
}
