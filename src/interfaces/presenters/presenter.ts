import { IResponse } from '../interface.types';

export enum ErrorStatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  INTERNAL_SERVER_ERROR = 500,
}

export class Presenter {
  public badRequest(message: string): IResponse {
    return { payload: message, statusCode: ErrorStatusCodes.BAD_REQUEST };
  }

  public unauthorized(message: string): IResponse {
    return { payload: message, statusCode: ErrorStatusCodes.UNAUTHORIZED };
  }

  public paymentRequired(message: string): IResponse {
    return { payload: message, statusCode: ErrorStatusCodes.PAYMENT_REQUIRED };
  }

  public forbidden(message: string): IResponse {
    return { payload: message, statusCode: ErrorStatusCodes.FORBIDDEN };
  }

  public notFound(message: string): IResponse {
    return { payload: message, statusCode: ErrorStatusCodes.NOT_FOUND };
  }

  public internalServerError(message?: string): IResponse {
    return { payload: message ?? 'Internal server error', statusCode: ErrorStatusCodes.INTERNAL_SERVER_ERROR };
  }

  public success<OutputDTO>(payload: OutputDTO): IResponse {
    return { payload, statusCode: 200 };
  }
}
