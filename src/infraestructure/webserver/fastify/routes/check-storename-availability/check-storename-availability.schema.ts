import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IParams } from './check-storename-availability.types';

const paramsSchema: JSONSchemaType<IParams> = {
  type: 'object',
  properties: {
    storename: {
      type: 'string'
    }
  },
  required: ['storename'],
};

const schema: FastifySchema = {
  params: paramsSchema,
  // TODO: reponse
  // response: {
  //   204: {},
  // },
};

export default schema;
