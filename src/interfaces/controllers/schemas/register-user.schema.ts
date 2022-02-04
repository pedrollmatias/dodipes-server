import { IRegisterUserRequest } from '../../../application/use-cases/user/register-user.use-case';
import { TSchemaModel } from '../controller.types';

const schema: TSchemaModel<IRegisterUserRequest> = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
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
        avatar: {
          type: 'string',
          nullable: true,
        },
        password: {
          type: 'string',
          nullable: true,
        },
      },
      required: ['email', 'name'],
    },
  },
  required: ['body'],
};

export default schema;
