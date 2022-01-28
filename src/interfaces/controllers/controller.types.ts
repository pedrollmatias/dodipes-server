/*
 * - O modelo dos schemas para validação dos dados da requisição adotado segue o padrão do AJV.
 * - Apenas o tipo do schema é importado do AJV, não as funcionalidades.
 * - Desde que seja utilizado o mesmo padrão de schema, qualquer validador irá funcionar, já que
 * é uma dependência injetada.
 * - Isso não fere os princípios da Clean Architecture, apesar dehaver um import do ajv na
 * camada de interface.
 */

import { JSONSchemaType } from 'ajv';

export interface HttpRequest {
  body?: unknown;
  params?: unknown;
  headers?: unknown;
  querystring?: unknown;
}

export type TSchemaModel<T> = JSONSchemaType<T>;
