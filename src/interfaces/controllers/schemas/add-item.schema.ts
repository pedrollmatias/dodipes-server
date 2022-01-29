import { IAddItemRequest } from '../../../application/use-cases/item/add-item.use-case';
import { TSchemaModel } from '../controller.types';

const schema: TSchemaModel<IAddItemRequest> = {
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        storeId: {
          type: 'string',
        },
        categoryId: {
          type: 'string',
        },
      },
      required: ['storeId', 'categoryId'],
    },
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
          nullable: true,
        },
        price: {
          type: 'number',
        },
        media: {
          type: 'object',
          nullable: true,
          required: [],
        },
        active: {
          type: 'boolean',
          nullable: true,
        },
      },
      required: ['name', 'price'],
    },
  },
  required: ['body', 'params'],
};

export default schema;
