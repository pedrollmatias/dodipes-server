import { TSchemaModel } from '../controller.types';
import { IEditStoreLogoRequest } from '../../../application/use-cases/store/edit-store-logo.use-case';

const schema: TSchemaModel<IEditStoreLogoRequest> = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        logo: {
          type: 'object',
          nullable: true,
          required: [],
        },
      },
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
