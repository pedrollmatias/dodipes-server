import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IRemoveCategoryParams, IRemoveCategoryResponse } from './remove-category.types';

const paramsSchema: JSONSchemaType<IRemoveCategoryParams> = {
  type: 'object',
  properties: {
    categoryId: {
      type: 'string',
    },
  },
  required: ['categoryId'],
};

const responseSchema: JSONSchemaType<IRemoveCategoryResponse> = {
  type: 'object',
  properties: {
    removedId: {
      type: 'string',
    },
  },
  required: ['removedId'],
};

const schema: FastifySchema = {
  params: paramsSchema,
  response: {
    '2xx': responseSchema,
  },
};

export default schema;
