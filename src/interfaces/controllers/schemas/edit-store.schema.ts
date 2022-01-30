import { IEditStoreRequest } from '../../../application/use-cases/store/edit-store.use-case';
import { TSchemaModel } from '../controller.types';

const schema: TSchemaModel<IEditStoreRequest> = {
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        storeId: {
          type: 'string',
        },
      },
      required: ['storeId'],
    },
    body: {
      type: 'object',
      properties: {
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
          nullable: true,
          required: ['city', 'neighborhood', 'number', 'state', 'street', 'zipCode'],
        },
        media: {
          type: 'object',
          properties: {
            coverPhoto: {
              type: 'object',
              nullable: true,
              required: [],
            },
            logo: {
              type: 'object',
              nullable: true,
              required: [],
            },
          },
          nullable: true,
        },
        name: {
          nullable: true,
          type: 'string',
        },
      },
    },
  },
  required: ['params', 'body'],
};

export default schema;
