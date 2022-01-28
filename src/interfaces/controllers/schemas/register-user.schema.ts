// TODO: Verificar se o tipo do schema pode vir da camada superior da clean architecture

import { IKeySchema } from '../controller.types';

const bodySchema: IKeySchema = {
  type: 'object',
  properties: {
    bornDate: {
      type: 'object',
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
    username: { type: 'string' },
  },
  required: ['bornDate', 'email', 'name', 'password', 'sex', 'username'],
};

export default <IKeySchema>{
  type: 'object',
  properties: {
    body: bodySchema,
  },
};
