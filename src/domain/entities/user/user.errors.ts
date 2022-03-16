export class InvalidNameError extends Error {
  constructor({ name }: { name: string }) {
    super(`The name "${name}" is invalid.`);
    this.name = 'InvalidNameError';
  }
}

export class InvalidAvatarError extends Error {
  constructor() {
    super('A url fornecida para o avatar não é válida');
    this.name = 'InvalidAvatarUrlError';
  }
}
