export interface CustomError {
  statusCode: number;
  message: string;
}

export enum ErrorCodes {
  NOT_ACCEPTABLE = 406,
}
