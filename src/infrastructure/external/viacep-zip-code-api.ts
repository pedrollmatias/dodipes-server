import { IZipCodeAddress, ZipCodeApi } from '../../application/shared/zip-code-api';
import axios from 'axios';

export class ViaCepZipCodeApi implements ZipCodeApi {
  async getAddress(zipCode: string): Promise<IZipCodeAddress> {
    const uri = `https://viacep.com.br/ws/${zipCode}/json`;

    const { data: address } = await axios.get(uri);

    return {
      city: address.localidade,
      neighborhood: address.bairro,
      state: address.uf,
      street: address.logradouro,
      zipCode,
    };
  }
}
