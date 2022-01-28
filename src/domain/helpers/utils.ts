export interface IField {
  name: string;
  label: string;
}

export const getNotProvidedFields = <ObjectType>(
  requiredFields: IField[],
  object: ObjectType
): IField[] => requiredFields.filter(({ name }: IField) =>
    Object.keys(object).includes(name)
  );

export const getNotProvidadFieldsStr = (fields: IField[]): string => {
  const notProvidedFieldsStr = fields.map(({ label }) => label).join(', ');

  return `[${notProvidedFieldsStr}]`;
};

export const standardizeLabel = (label: string): string => label.trim().toLowerCase();
