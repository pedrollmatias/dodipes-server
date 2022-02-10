import { IAuthUserResponse } from '../../../application/use-cases/user/auth-user.use-case-';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IAuthUserResponse> = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
    },
  },
  required: ['accessToken'],
};

export default schema;
