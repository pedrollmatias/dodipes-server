import { ICheckStorenameAvailabilityOutputDTO } from '../../../../../application/use-cases/check-storename-availability/check-storename-availability.output-dto';

export type IQuery = {
  storename: string;
};

export type IResponse = ICheckStorenameAvailabilityOutputDTO;
