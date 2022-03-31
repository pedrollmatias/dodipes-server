import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { validStates } from '../../../../../domain/shared/address/state';
import { IBody, IParams, IResponse } from './add-store.types';

const paramsSchema: JSONSchemaType<IParams> = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
    },
  },
  required: ['userId'],
};

const bodySchema: JSONSchemaType<IBody> = {
  type: 'object',
  properties: {
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
          enum: validStates,
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

    coverPhoto: {
      nullable: true,
      type: 'string',
    },
    logo: {
      nullable: true,
      type: 'string',
    },
    name: {
      type: 'string',
    },
    storename: {
      type: 'string',
    },
  },
  required: ['address', 'name', 'storename'],
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
