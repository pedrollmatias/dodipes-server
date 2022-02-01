import { TSchemaModel } from '../controller.types';
import { IEditCategoryRequest } from '../../../application/use-cases/category/edit-category.use-case';

const schema: TSchemaModel<IEditCategoryRequest> = {
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
          nullable: true,
        },
        active: {
          type: 'boolean',
          nullable: true,
        },
      },
    },
  },
  required: ['body', 'params'],
};

export default schema;
