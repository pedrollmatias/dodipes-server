// import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
// import { User } from '../../../domain/entities/user/user';
// import { IDomainUser, IName, TPasswordHashMethod } from '../../../domain/entities/user/user.types';
// import { TInsertOutput } from '../../shared/use-case.types';
// import { UserRepository } from '../../repositories/user-repository';

// export interface IAddUserUseCaseInput {
//   name: IName;
//   email: string;
//   password?: string;
//   avatar?: string;
// }

// export interface IAddUserRepositories<IdType> {
//   userRepository: UserRepository<IdType>;
// }

// export interface IAddUserExternalInterfaces {
//   passwordHashMethod: TPasswordHashMethod;
// }

// export class AddUser<IdType> {
//   private readonly userRepository: UserRepository<IdType>;

//   private readonly passwordHashMethod: TPasswordHashMethod;

//   constructor({
//     repositories,
//     externalInterfaces,
//   }: {
//     repositories: IAddUserRepositories<IdType>;
//     externalInterfaces: IAddUserExternalInterfaces;
//   }) {
//     const { userRepository } = repositories;
//     const { passwordHashMethod } = externalInterfaces;

//     this.userRepository = userRepository;
//     this.passwordHashMethod = passwordHashMethod;
//   }

//   async handle({ input }: { input: IAddUserUseCaseInput }): Promise<TInsertOutput<IdType>> {
//     const userId = this.userRepository.getNextId();
//     const userIdString = this.userRepository.idToString(userId);

//     const user = await User.create({
//       data: {
//         ...input,
//         createdAt: new Date(),
//       },
//       passwordHashMethod: this.passwordHashMethod,
//     });

//     await this.validate(user.value);

//     return this.userRepository.insertOne(user.value);
//   }

//   private async validate(user: IDomainUser): Promise<void> {
//     const userExists = Boolean(await this.userRepository.findOne({ email: user.email }));

//     if (userExists) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.NOT_ACCEPTABLE,
//         message: 'Já existe um usuário com este email',
//       };
//     }
//   }
// }
