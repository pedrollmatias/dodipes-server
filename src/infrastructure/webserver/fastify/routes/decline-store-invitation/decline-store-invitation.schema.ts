import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IDeclineStoreInvitationParams } from './decline-store-invitation.types';

const paramsSchema: JSONSchemaType<IDeclineStoreInvitationParams> = {
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
