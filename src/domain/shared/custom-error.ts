export interface CustomError {
  statusCode: number;
  message: string;
}

export enum ErrorCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  PRECONDITION_FAILED = 412,
  INTERNAL_SERVER_ERROR = 500,
}
