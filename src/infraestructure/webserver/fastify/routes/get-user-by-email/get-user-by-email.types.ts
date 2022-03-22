import { ObjectId } from 'mongodb';
import { IGetUserByEmailOutputDTO } from '../../../../../application/use-cases/get-user-by-email/get-user-by-email.output-dto';

export type IQuerystring = { email: string };

export type IResponse = IGetUserByEmailOutputDTO<ObjectId>;
