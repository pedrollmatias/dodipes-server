import { IRemoveCategoryRequest } from '../../../application/use-cases/category/remove-category';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IRemoveCategoryRequest> = {
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
      required: ['categoryId', 'storeId'],
    },
  },
  required: ['params'],
};

export default schema;
