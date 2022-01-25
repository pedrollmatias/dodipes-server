export class Email {
  private readonly email: string;

  private constructor(email: string) {
    this.email = email;

    Object.freeze(this);
  }

  get value(): string {
    return this.email;
  }

  static create(email: string): Email {
    Email.validate(email);

    return new Email(email);
  }

  static validate(email: string): void {
    // TODO
  }
}
