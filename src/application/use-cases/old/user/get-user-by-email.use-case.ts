// import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
// import { IRepositoryUser, UserRepository } from './user-repository';
// import { throwForbiddenError } from '../../helpers/throw-forbidden-error';

// export interface IGetUserByEmailUseCaseInput {
//   email: string;
// }

// export interface IGetUserByEmailRepositories<IdType> {
//   userRepository: UserRepository<IdType>;
// }

// export class GetUserByEmail<IdType> {
//   private readonly userRepository: UserRepository<IdType>;

//   constructor({ repositories }: { repositories: IGetUserByEmailRepositories<IdType> }) {
//     const { userRepository } = repositories;

//     this.userRepository = userRepository;
//   }

//   async handle({
//     input,
//     requestUserId,
//   }: {
//     input: IGetUserByEmailUseCaseInput;
//     requestUserId: string;
//   }): Promise<IRepositoryUser<IdType>> {
//     const { email } = input;

//     const user: IRepositoryUser<IdType> | null = await this.userRepository.findOne({ email });

//     if (!user) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.NOT_FOUND,
//         message: 'Usuário não encontrado',
//       };
//     }

//     if (!this.userRepository.idIsEqualToString({ id: user._id, string: requestUserId })) {
//       return throwForbiddenError();
//     }

//     return user;
//   }
// }
