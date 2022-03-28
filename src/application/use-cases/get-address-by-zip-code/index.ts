import { viaCepZipCodeApi } from '../../../infraestructure/external';
import { GetAddressByZipCode } from './get-address-by-zip-code.use-case';

export const getAddressByZipCode = new GetAddressByZipCode({ externalInterfaces: { zipCodeApi: viaCepZipCodeApi } });
