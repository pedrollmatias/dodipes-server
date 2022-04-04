import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IParams, IBody, IQuery, IResponse } from './<FTName | kebabcase>.types';

const bodySchema: JSONSchemaType<IBody> = {};

const querySchema: JSONSchemaType<IQuery> = {};

const paramsSchema: JSONSchemaType<IParams> = {};

const responseSchema: JSONSchemaType<IResponse> = {};

const schema: FastifySchema = {
  body: bodySchema,
  params: paramsSchema,
  querystring: querySchema,
  response: {
    '2xx': responseSchema,
  },
};

export default schema;
