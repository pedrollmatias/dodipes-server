import { IGetUserByEmailResponse } from '../../../application/use-cases/user/get-user-by-email.use-case';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IGetUserByEmailResponse> = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    avatar: {
      type: 'string',
      nullable: true,
    },
    email: {
      type: 'string',
    },
    name: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
      },
      required: ['firstName', 'lastName'],
    },
  },
  required: ['_id', 'email', 'name'],
};

export default schema;
