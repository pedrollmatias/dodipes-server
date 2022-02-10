import { TSchemaModel } from '../../interface.types';
import { IAddStoreRequest } from '../../../application/use-cases/store/add-store.use-case';

const schema: TSchemaModel<IAddStoreRequest> = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        storename: {
          type: 'string',
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
            },
            number: {
              type: 'string',
            },
            complement: {
              type: 'string',
              nullable: true,
            },
            neighborhood: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            state: {
              type: 'string',
            },
            zipCode: {
              type: 'string',
            },
          },
          required: ['city', 'neighborhood', 'number', 'state', 'street', 'zipCode'],
        },
        media: {
          type: 'object',
          nullable: true,
          properties: {
            logo: {
              nullable: true,
              type: 'object',
              required: [],
            },
            coverPhoto: {
              nullable: true,
              type: 'object',
              required: [],
            },
          },
        },
      },
      required: ['name'],
    },
  },
  required: ['body'],
};

export default schema;
