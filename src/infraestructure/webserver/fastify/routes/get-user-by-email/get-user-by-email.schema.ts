import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IBody, IResponse } from './get-user-by-email.types';

const bodySchema: JSONSchemaType<IBody> = {
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
  body: bodySchema,
  response: {
    200: responseSchema,
  },
};

export default schema;
