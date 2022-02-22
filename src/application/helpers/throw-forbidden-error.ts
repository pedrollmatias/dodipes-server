import { CustomError, ErrorCodes } from '../../domain/shared/custom-error';

export const throwForbiddenError = () => {
  throw <CustomError>{ statusCode: ErrorCodes.FORBIDDEN, message: 'Acesso não autorizado' };
};
