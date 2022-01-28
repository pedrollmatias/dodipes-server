import { CustomError, ErrorCodes } from './custom-error';
import { standardizeLabel } from '../helpers/utils';

type IIdentifiesType = 'username' | 'storename';

export class IdentifierName {
  private readonly identifierName: string;

  private constructor(identifierName: string) {
    this.identifierName = identifierName;
  }

  get value(): string {
    return this.identifierName;
  }

  static create(identifierName: string, identifierLabel: IIdentifiesType): IdentifierName {
    IdentifierName.validate(identifierName, identifierLabel);

    return new IdentifierName(identifierName);
  }

  static validate(identifierName: string, identifierLabel: IIdentifiesType): void {
    const identifierNameRegex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;

    if (!identifierNameRegex.test(identifierName)) {
      const standardizedIdentifierLabel = standardizeLabel(identifierLabel);

      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `O ${standardizedIdentifierLabel} não é válido.`,
      };
    }
  }
}
