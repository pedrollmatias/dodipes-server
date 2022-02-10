import { IGetUserByEmailRequest } from '../../../application/use-cases/user/get-user-by-email.use-case';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IGetUserByEmailRequest> = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
      },
      required: ['email'],
    },
  },
  required: ['body'],
};

export default schema;
