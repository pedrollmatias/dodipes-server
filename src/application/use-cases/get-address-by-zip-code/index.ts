import { viaCepZipCodeApi } from '../../../infrastructure/external';
import { GetAddressByZipCode } from './get-address-by-zip-code.use-case';

export const getAddressByZipCode = new GetAddressByZipCode({ externalInterfaces: { zipCodeApi: viaCepZipCodeApi } });
