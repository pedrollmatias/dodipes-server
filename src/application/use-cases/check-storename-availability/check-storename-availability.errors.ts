export class DuplicatedStorenameError extends Error {
  constructor({ storename }: { storename: string }) {
    super(`O ${storename} já está sendo utilizado`);

    this.name = 'DuplicatedStorenameError';
  }
}
