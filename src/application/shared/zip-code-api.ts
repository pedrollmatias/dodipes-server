export interface IZipCodeAddress {
  zipCode: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export abstract class ZipCodeApi {
  abstract getAddress: (zipCode: string) => Promise<IZipCodeAddress>;
}
