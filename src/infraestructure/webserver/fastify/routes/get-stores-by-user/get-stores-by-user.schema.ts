import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IParams, IResponse } from './get-stores-by-user.types';

const paramsSchema: JSONSchemaType<IParams> = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
    },
  },
  required: ['userId'],
};

const responseSchema: JSONSchemaType<IResponse> = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    address: {
      type: 'object',
      properties: {
        city: {
          type: 'string',
        },
        complement: {
          nullable: true,
          type: 'string',
        },
        neighborhood: {
          type: 'string',
        },
        number: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        street: {
          type: 'string',
        },
        zipCode: {
          type: 'string',
        },
      },
      required: ['city', 'neighborhood', 'number', 'state', 'street', 'zipCode'],
    },
    createdAt: {
      type: 'string',
    },
    media: {
      nullable: true,
      type: 'object',
      properties: {
        coverPhoto: {
          nullable: true,
          type: 'object',
          required: [],
        },
        logo: {
          nullable: true,
          type: 'object',
          required: [],
        },
      },
    },
    modifiedAt: {
      type: 'string',
      nullable: true,
    },
    name: {
      type: 'string',
    },
    storename: {
      type: 'string',
    },
  },
  required: ['_id', 'address', 'createdAt', 'name', 'storename'],
};

const schema: FastifySchema = {
  params: paramsSchema,
  response: {
    '2xx': responseSchema,
  },
};

export default schema;