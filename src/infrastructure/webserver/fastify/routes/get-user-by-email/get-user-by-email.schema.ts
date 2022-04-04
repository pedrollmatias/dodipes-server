import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IParams, IResponse } from './get-user-by-email.types';

const paramsSchema: JSONSchemaType<IParams> = {
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
      type: 'string',
    },
    avatar: {
      nullable: true,
      type: 'string',
    },
    createdAt: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    modifiedAt: {
      nullable: true,
      type: 'string',
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
  params: paramsSchema,
  response: {
    '2xx': responseSchema,
  },
};

export default schema;
