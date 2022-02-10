import { TInsertResponse } from '../../../application/shared/use-case.types';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<TInsertResponse> = {
  type: 'object',
  properties: {
    insertedId: {
      type: 'string',
    },
  },
  required: ['insertedId'],
};

export default schema;
