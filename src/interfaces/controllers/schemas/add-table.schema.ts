import { IAddSingleTableRequest } from '../../../application/use-cases/table/add-single-table';
import { TSchemaModel } from '../controller.types';

const schema: TSchemaModel<IAddSingleTableRequest> = {
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        storeId: {
          type: 'string',
        },
      },
      required: ['storeId'],
    },
    body: {
      type: 'object',
      properties: {
        active: {
          type: 'boolean',
          nullable: true,
        },
        number: {
          type: 'integer',
        },
      },
      required: ['number'],
    },
  },
  required: ['body', 'params'],
};

export default schema;
