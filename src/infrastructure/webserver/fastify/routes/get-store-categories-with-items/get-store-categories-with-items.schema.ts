import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IParams, IResponse } from './get-store-categories-with-items.types';

const paramsSchema: JSONSchemaType<IParams> = {
  type: 'object',
  properties: {
    storeId: {
      type: 'string',
    },
  },
  required: ['storeId'],
};

const responseSchema: JSONSchemaType<IResponse> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
      },
      active: {
        nullable: true,
        type: 'boolean',
      },
      createdAt: {
        type: 'string',
      },
      modifiedAt: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
      },
      storeId: {
        type: 'string',
      },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            active: {
              nullable: true,
              type: 'boolean',
            },
            createdAt: {
              type: 'string',
            },
            description: {
              nullable: true,
              type: 'string',
            },
            media: {
              nullable: true,
              type: 'string',
            },
            modifiedAt: {
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
          required: ['createdAt', 'name', 'price'],
        },
      },
    },
    required: ['_id', 'createdAt', 'name', 'storeId'],
  },
};

const schema: FastifySchema = {
  params: paramsSchema,
  response: {
    '2xx': responseSchema,
  },
};

export default schema;
