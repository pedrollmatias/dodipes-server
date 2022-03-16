export interface IRequesPropsIndexes {
  body?: unknown;
  headers?: unknown;
  params?: unknown;
  querystring?: unknown;
}

export interface IRequest<IRequestProps extends IRequesPropsIndexes> {
  body: IRequestProps['body'];
  headers: IRequestProps['headers'];
  params: IRequestProps['params'];
  querystring: IRequestProps['querystring'];
}

export interface IResponse {
  statusCode: number;
  payload: unknown;
}
