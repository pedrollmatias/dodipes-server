export interface IRequesPropsIndexes {
  locals?: unknown;
  body?: unknown;
  headers?: unknown;
  params?: unknown;
  querystring?: unknown;
}

export interface IRequest<IRequestProps extends IRequesPropsIndexes> {
  locals: IRequestProps['locals'];
  body: IRequestProps['body'];
  headers: IRequestProps['headers'];
  params: IRequestProps['params'];
  querystring: IRequestProps['querystring'];
}

export interface IResponse {
  statusCode: number;
  payload: unknown;
}
