import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import { verifyToken } from '../middlewares/verify-token';
import {
  GetAddressByZipCode,
  IGetAddressByZipCodeExternalInterfaces,
  IGetAddressByZipCodeRequest,
} from '../../../../application/use-cases/store/get-address-by-zip-code.use-case';
import { ViaCepZipCodeApi } from '../../../external/viacep-zip-code-api';
import { IZipCodeAddress } from '../../../../application/shared/zip-code-api';
import ajv from '../../../external/ajv/ajv-instance';

import controllerSchema from '../../../../interfaces/controllers/schemas/get-address-by-zip-code.schema';
import presenterSchema from '../../../../interfaces/presenters/schemas/get-address-by-zip-code.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.get('/address/:zipCode', { preHandler: verifyToken }, async (request): Promise<IZipCodeAddress> => {
    const controllerDataValidator = new AjvDataValidator<IGetAddressByZipCodeRequest>(ajv);
    const controllerSchemaValidator = new AjvSchemaValidator<IGetAddressByZipCodeRequest>(ajv);
    const controller = new DefaultController<IGetAddressByZipCodeRequest>({
      dataValidator: controllerDataValidator,
      schemaValidator: controllerSchemaValidator,
      schema: controllerSchema,
    });

    const externalInterfaces: IGetAddressByZipCodeExternalInterfaces = {
      zipCodeApi: new ViaCepZipCodeApi(),
    };
    const useCase = new GetAddressByZipCode({ externalInterfaces });

    const presenterDataValidator = new AjvDataValidator<IZipCodeAddress>(ajv);
    const presenterSchemaValidator = new AjvSchemaValidator<IZipCodeAddress>(ajv);
    const presenter = new DefaultPresenter<IZipCodeAddress>({
      dataValidator: presenterDataValidator,
      schemaValidator: presenterSchemaValidator,
      schema: presenterSchema,
    });

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const { payload } = presenter.handle({ input: useCaseOutput });

    return payload;
  });
};
