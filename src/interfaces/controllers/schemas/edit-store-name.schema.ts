import { TSchemaModel } from '../../interface.types';
import { IEditStoreNameRequest } from '../../../application/use-cases/store/edit-store-name.use-case';

const schema: TSchemaModel<IEditStoreNameRequest> = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
      required: ['name'],
    },
    params: {
      type: 'object',
      properties: {
        storeId: {
          type: 'string',
        },
      },
      required: ['storeId'],
    },
  },
  required: ['body', 'params'],
};

export default schema;
