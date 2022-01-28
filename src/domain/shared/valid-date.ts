import { CustomError, ErrorCodes } from './custom-error';

export class ValidDate {
  private readonly date: Date;

  private constructor(date: Date) {
    this.date = date;
  }

  get value(): Date {
    return this.date;
  }

  static create(date: Date, dateLabel: string) {
    ValidDate.validate(date, dateLabel);

    return new ValidDate(date);
  }

  static validate(date: Date, dateLabel: string) {
    const today = new Date();

    if (date > today) {
      const standardizedDateLabel = dateLabel.trim().toLowerCase();

      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `A ${standardizedDateLabel} não pode ser após a data atual`,
      };
    }
  }
}
