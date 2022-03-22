import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IQuerystring, IResponse } from './get-user-by-email.types';

const queryStringSchema: JSONSchemaType<IQuerystring> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
  },
  required: ['email'],
};

const responseSchema: JSONSchemaType<IResponse> = {
  type: 'object',
  properties: {
    _id: {
      type: 'object',
      required: [],
    },
    avatar: {
      nullable: true,
      type: 'string',
    },
    createdAt: {
      type: 'object',
      required: [],
    },
    email: {
      type: 'string',
    },
    modifiedAt: {
      nullable: true,
      type: 'object',
      required: [],
    },
    name: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
      },
      required: ['firstName', 'lastName'],
    },
  },
  required: ['_id', 'createdAt', 'email', 'name'],
};

const schema: FastifySchema = {
  querystring: queryStringSchema,
  // body: bodySchema,
  response: {
    200: responseSchema,
  },
};

export default schema;
