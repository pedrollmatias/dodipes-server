export class InternalError extends Error {
  constructor({ message }: { message?: string }) {
    super(message ?? 'Internal server error');
    this.name = 'InternalError';
  }
}
