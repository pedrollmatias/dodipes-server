import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IBody, IParams, IResponse } from './add-category.types';

const paramsSchema: JSONSchemaType<IParams> = {
  type: 'object',
  properties: {
    storeId: {
      type: 'string',
    },
  },
  required: ['storeId'],
};

const bodySchema: JSONSchemaType<IBody> = {
  type: 'object',
  properties: {
    active: {
      nullable: true,
      type: 'boolean',
    },
    name: {
      type: 'string',
    },
  },
  required: ['name'],
};

const responseSchema: JSONSchemaType<IResponse> = {
  type: 'object',
  properties: {
    insertedId: {
      type: 'string',
    },
  },
  required: ['insertedId'],
};

const schema: FastifySchema = {
  params: paramsSchema,
  body: bodySchema,
  response: {
    '2xx': responseSchema,
  },
};

export default schema;
