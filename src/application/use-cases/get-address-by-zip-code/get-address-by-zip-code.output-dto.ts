export interface IGetAddressByZipCodeOutputDto {
  zipCode: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}
