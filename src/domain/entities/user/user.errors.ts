export class InvalidAvatarError extends Error {
  constructor() {
    super('A url fornecida para o avatar não é válida');
    this.name = 'InvalidAvatarUrlError';
  }
}
