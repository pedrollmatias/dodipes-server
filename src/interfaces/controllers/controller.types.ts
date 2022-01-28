export interface HttpRequest {
  body?: unknown;
  params?: unknown;
  headers?: unknown;
  querystring?: unknown;
}

export interface IPropSchema {
  [key: string]: IKeySchema;
}

export interface IKeySchema {
  type:
    | 'number'
    | 'integer'
    | 'string'
    | 'boolean'
    | 'array'
    | 'object'
    | 'null';
  properties?: IPropSchema;
  items?: IPropSchema[];
  required?: string[];
}
