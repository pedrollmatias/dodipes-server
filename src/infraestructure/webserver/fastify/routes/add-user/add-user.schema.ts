import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IBody, IResponse } from './add-user.types';

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
  required: ['email', 'name'],
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
  body: bodySchema,
  response: {
    '2xx': responseSchema,
  },
};

export default schema;
