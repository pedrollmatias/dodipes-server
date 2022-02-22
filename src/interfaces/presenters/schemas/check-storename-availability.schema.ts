import { ICheckStorenameAvailabilityResponse } from '../../../application/use-cases/store/check-storename-avaliability.use-case';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<ICheckStorenameAvailabilityResponse> = {
  type: 'object',
  properties: {
    available: {
      type: 'boolean',
    },
  },
  required: ['available'],
};

export default schema;
