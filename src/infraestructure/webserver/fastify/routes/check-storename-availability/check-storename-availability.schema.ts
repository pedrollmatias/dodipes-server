import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IQuery, IResponse } from './check-storename-availability.types';

const querySchema: JSONSchemaType<IQuery> = {
  type: 'object',
  properties: {
    storename: {
      type: 'string',
    },
  },
  required: ['storename'],
};

const responseSchema: JSONSchemaType<IResponse> = {
  type: 'object',
  properties: {
    available: {
      type: 'boolean',
    },
  },
  required: ['available'],
};

const schema: FastifySchema = {
  querystring: querySchema,
  response: {
    '2xx': responseSchema,
  },
};

export default schema;
