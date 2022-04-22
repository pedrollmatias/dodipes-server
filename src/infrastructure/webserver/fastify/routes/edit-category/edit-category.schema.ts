import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IEditCategoryBody, IEditCategoryParams, IEditCategoryResponse } from './edit-category.types';

const paramsSchema: JSONSchemaType<IEditCategoryParams> = {
  type: 'object',
  properties: {
    categoryId: {
      type: 'string',
    },
  },
  required: ['categoryId'],
};

const bodySchema: JSONSchemaType<IEditCategoryBody> = {
  type: 'object',
  properties: {
    active: {
      nullable: true,
      type: 'boolean',
    },
    name: {
      nullable: true,
      type: 'string',
    },
  },
};

const responseSchema: JSONSchemaType<IEditCategoryResponse> = {
  type: 'object',
  properties: {
    updatedId: {
      type: 'string',
    },
  },
  required: ['updatedId'],
};

const schema: FastifySchema = {
  params: paramsSchema,
  body: bodySchema,
  response: { '2xx': responseSchema },
};

export default schema;
