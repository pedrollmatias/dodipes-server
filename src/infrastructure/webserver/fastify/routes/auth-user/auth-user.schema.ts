import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IBody, IHeaders, IResponse } from './auth-user.types';

const headersSchema: JSONSchemaType<IHeaders> = {
  type: 'object',
  properties: {
    authorization: {
      nullable: true,
      type: 'string',
    },
  },
};

const bodySchema: JSONSchemaType<IBody> = {
  type: 'object',
  properties: {
    avatar: {
      nullable: true,
      type: 'string',
    },
    email: {
      type: 'string',
    },
    name: {
      nullable: true,
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
    password: {
      nullable: true,
      type: 'string',
    },
  },
  required: ['email'],
};

const responseSchema: JSONSchemaType<IResponse> = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
    },
  },
  required: ['accessToken'],
};

const schema: FastifySchema = {
  headers: headersSchema,
  body: bodySchema,
  response: {
    '2xx': responseSchema,
  },
};

export default schema;