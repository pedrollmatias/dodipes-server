import { IName } from '../../../domain/entities/user/user.types';
import { TSchemaModel } from '../../interface.types';

export interface IAuthUserRequest {
  headers?: {
    authorization?: string;
  };
  body: {
    email: string;
    name?: IName;
    password?: string;
    avatar?: string;
  };
}

const schema: TSchemaModel<IAuthUserRequest> = {
  type: 'object',
  properties: {
    headers: {
      type: 'object',
      properties: {
        authorization: {
          type: 'string',
          nullable: true,
        },
      },
      nullable: true,
    },
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        avatar: {
          type: 'string',
          nullable: true,
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
          nullable: true,
          required: ['firstName', 'lastName'],
        },
        password: {
          type: 'string',
          nullable: true,
        },
      },
      required: ['email'],
    },
  },
  required: ['body'],
};

export default schema;
