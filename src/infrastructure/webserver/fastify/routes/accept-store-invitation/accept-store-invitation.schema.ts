import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IAcceptStoreInvitationParams } from './accept-store-invitation.types';

const paramsSchema: JSONSchemaType<IAcceptStoreInvitationParams> = {
  type: 'object',
  properties: {
    storeId: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
  },
  required: ['storeId', 'userId'],
};

const schema: FastifySchema = {
  params: paramsSchema,
  response: {
    204: {
      type: 'null',
    },
  },
};

export default schema;
