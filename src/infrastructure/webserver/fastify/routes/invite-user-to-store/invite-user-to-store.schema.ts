import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { IInviteUserToStoreBody, IInviteUserToStoreParams } from './invite-user-to-store.types';

const paramsSchema: JSONSchemaType<IInviteUserToStoreParams> = {
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

const bodySchema: JSONSchemaType<IInviteUserToStoreBody> = {
  type: 'object',
  properties: {
    invitedUserId: {
      type: 'string',
    },
  },
  required: ['invitedUserId'],
};

const schema: FastifySchema = {
  params: paramsSchema,
  body: bodySchema,
  response: {
    204: {
      type: 'null',
    },
  },
};

export default schema;
