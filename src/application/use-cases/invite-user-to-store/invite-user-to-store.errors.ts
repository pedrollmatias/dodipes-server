export class SameHostAndGuestError extends Error {
  constructor() {
    super('O usuário que realizou o convite deve ser diferente do convidado');

    this.name = 'SameHostAndGuestError';
  }
}
