import { IGetStoresByUserRequest } from '../../../application/use-cases/store/get-stores-by-user.use-case';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IGetStoresByUserRequest> = {
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
      },
      required: ['userId'],
    },
  },
  required: ['params'],
};

export default schema;
