export class RequiredError extends Error {
  constructor({ fieldName }: { fieldName: string }) {
    super(`O campo "${fieldName}" é obrigatório`);
    this.name = 'RequiredError';
  }
}

export class InvalidFieldError extends Error {
  constructor({ fieldName, value }: { fieldName: string; value: string }) {
    super(`O campo "${fieldName}" é invalido. Ocorrência: ${value}`);
    this.name = 'InvalidFieldError';
  }
}

export class MinLengthError extends Error {
  constructor({ fieldName, minLength, actualLength }: { fieldName: string; minLength: number; actualLength: number }) {
    super(
      `O campo "${fieldName}" deve ter no mínimo ${minLength.toString()} caracteres. Ocorrência: ${actualLength.toString()}`
    );
    this.name = 'MinLengthError';
  }
}

export class MaxLengthError extends Error {
  constructor({ fieldName, maxLength, actualLength }: { fieldName: string; maxLength: number; actualLength: number }) {
    super(
      `O campo "${fieldName}" deve ter no máximo ${maxLength.toString()} caracteres. Ocorrência: ${actualLength.toString()}`
    );
    this.name = 'MaxLengthError';
  }
}

export class ExactLengthError extends Error {
  constructor({
    fieldName,
    exactLength,
    actualLength,
  }: {
    fieldName: string;
    exactLength: number;
    actualLength: number;
  }) {
    super(
      `O campo "${fieldName}" deve ter no ${exactLength.toString()} caracteres. Ocorrência: ${actualLength.toString()}`
    );
    this.name = 'ExactLengthError';
  }
}

export class InvalidEmailError extends Error {
  constructor({ email }: { email: string }) {
    super(`O email "${email}" não é valido`);
    this.name = 'InvalidEmailError';
  }
}

export class RequiredLetterError extends Error {
  constructor({ fieldName }: { fieldName: string }) {
    super(`O campo ${fieldName} precisa conter pelo menos uma letra`);
    this.name = 'RequiredLetterError';
  }
}

export class RequiredNumberError extends Error {
  constructor({ fieldName }: { fieldName: string }) {
    super(`O campo ${fieldName} precisa conter pelo menos um número`);
    this.name = 'RequiredNumberError';
  }
}

export class InvalidEnumError extends Error {
  constructor({ value, enumValues }: { value: string; enumValues: string[] }) {
    const enumArrayStr = enumValues.join(', ');

    super(`O valor "${value}" não é permitido pelo campo. Permitidos: "[${enumArrayStr}]"`);
    this.name = 'InvalidEnumError';
  }
}
