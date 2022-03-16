export class DuplicatedRegisterError extends Error {
  constructor({ entityName }: { entityName: string }) {
    super(`Já existe um registro da entidade ${entityName}`);

    this.name = 'DuplicatedRegisterError';
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super('Acesso não autorizado');

    this.name = 'ForbiddenError';
  }
}
