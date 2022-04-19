import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IBody, IParams, IResponse } from './add-item.types';

const bodySchema: JSONSchemaType<IBody> = {
  type: 'object',
  properties: {
    active: {
      nullable: true,
      type: 'boolean',
    },
    description: {
      nullable: true,
      type: 'string',
    },
    media: {
      nullable: true,
      type: 'string',
    },
    name: {
      type: 'string',
    },
    price: {
      type: 'integer',
    },
  },
  required: ['name', 'price'],
};

const paramsSchema: JSONSchemaType<IParams> = {
  type: 'object',
  properties: {
    categoryId: {
      type: 'string',
    },
    storeId: {
      type: 'string',
    },
  },
  required: ['categoryId', 'storeId'],
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
