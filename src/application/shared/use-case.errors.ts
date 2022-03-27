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

export class ResourceNotFoundError extends Error {
  constructor({ message }: { message?: string }) {
    super(message ?? 'Recurso não encontrado');

    this.name = 'ResourceNotFoundError';
  }
}