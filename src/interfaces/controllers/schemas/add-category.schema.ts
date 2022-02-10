import { TSchemaModel } from '../../interface.types';
import { IAddCategoryRequest } from '../../../application/use-cases/category/add-category.use-case';

const schema: TSchemaModel<IAddCategoryRequest> = {
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        storeId: {
          type: 'string'
        }
      },
      required: ['storeId']
    },
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        active: {
          type: 'boolean',
          nullable: true,
        },
      },
      required: ['name'],
    },
  },
  required: ['body', 'params'],
};

export default schema;
