import { ICheckStorenameAvailabilityRequest } from '../../../application/use-cases/store/check-storename-avaliability.use-case';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<ICheckStorenameAvailabilityRequest> = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        storename: {
          type: 'string'
        }
      },
      required: ['storename']
    }
  },
  required: ['body'],
};

export default schema;
