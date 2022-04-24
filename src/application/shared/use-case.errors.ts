export class DuplicatedRegisterError extends Error {
  constructor({ entityName }: { entityName: string }) {
    super(`Já existe um registro da entidade ${entityName.toLowerCase()}`);

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

export class InvalidStoreAdminError extends Error {
  constructor() {
    super('O usuário não é administrador do estabelecimento');

    this.name = 'InvalidStoreAdminError';
  }
}

export class InvalidStoreInvitationError extends Error {
  constructor() {
    super('Não existe um convite pendente para o usuário');

    this.name = 'InvalidStoreInvitationError';
  }
}
