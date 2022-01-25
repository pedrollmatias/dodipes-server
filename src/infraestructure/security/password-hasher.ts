import { hash } from "bcrypt";

export class PasswordHasher {
  async hash(plainText: string): Promise<string> {
    const saltRounds = 10;
    
    return hash(plainText, saltRounds);
  }

  check() {
    // TODO
  }
}
