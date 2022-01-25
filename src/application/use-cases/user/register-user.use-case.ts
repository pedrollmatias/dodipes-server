import { User } from "../../../domain/user/user";
import { IUserData } from "../../../domain/user/user-data";
import { UserRepository } from "./user-repository";

export class RegisterUser {
  private readonly userRepository: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo;
  }

  async handle(userData: IUserData): Promise<any> {
    const user = User.create(userData);

    await this.validate(user);

    return this.userRepository.add({
      name: user.name.value,
      username: user.username.value,
      email: user.email.value,
      bornDate: user.bornDate,
      sex: user.sex,
      passwordHash: user.passwordHash,
    });
  }

  private async validate(user: User): Promise<void> {
    if (await this.userRepository.exists({ username: user.username.value })) {
      throw new Error("Já existe um usuário com este username");
    }

    if (await this.userRepository.exists({ username: user.username.value })) {
      throw new Error("Já existe um usuário com este email");
    }
  }
}
