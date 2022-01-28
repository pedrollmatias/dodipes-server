import { TSchemaModel } from '../controller.types';
import { IRegisterUserInput } from '../../../application/use-cases/user/register-user.use-case';

const schema: TSchemaModel<IRegisterUserInput> = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        bornDate: {
          type: 'object',
          required: [],
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
        password: {
          type: 'string',
        },
        sex: {
          type: 'string',
        },
      },
      required: ['bornDate', 'email', 'name', 'password', 'sex'],
    },
  },
  required: ['body'],
};

export default schema;
