import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IParams, IResponse } from './get-address-by-zip-code.types';

const paramsSchema: JSONSchemaType<IParams> = {
  type: 'object',
  properties: {
    zipCode: {
      type: 'string',
    },
  },
  required: ['zipCode'],
};

const responseSchema: JSONSchemaType<IResponse> = {
  type: 'object',
  properties: {
    city: {
      nullable: true,
      type: 'string',
    },
    neighborhood: {
      nullable: true,
      type: 'string',
    },
    state: {
      nullable: true,
      type: 'string',
    },
    street: {
      nullable: true,
      type: 'string',
    },
    zipCode: {
      type: 'string',
    },
  },
  required: ['zipCode'],
};

const schema: FastifySchema = {
  params: paramsSchema,
  response: {
    '2xx': responseSchema,
  }
};

export default schema;
