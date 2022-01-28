import { TSchemaModel } from '../controller.types';
import { IAddStoreInput } from '../../../application/use-cases/store/add-store.use-case';

const schema: TSchemaModel<IAddStoreInput> = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
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
        users: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['name'],
    },
  },
  required: ['body'],
};

export default schema;
