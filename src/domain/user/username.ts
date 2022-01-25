export class Username {
  private readonly username: string;

  private constructor(username: string) {
    this.username = username;
    Object.freeze(this);
  }

  get value(): string {
    return this.username;
  }

  static create(username: string): Username {
    Username.validate(username);

    return new Username(username);
  }

  static validate(name: string): boolean {
    // TODO

    return true;
  }
}
