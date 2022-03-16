import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { ObjectId } from 'mongodb';
import { IInsertionDTO } from '../../../../../application/shared/output-dto';
import { IBody } from './add-user.types';

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

const responseSchema: JSONSchemaType<IInsertionDTO<ObjectId>> = {
  type: 'object',
  properties: {
    insertedId: {
      type: 'object',
      required: [],
    },
  },
  required: ['insertedId'],
};

const schema: FastifySchema = {
  body: bodySchema,
  response: {
    200: responseSchema,
  },
};

export default schema;
