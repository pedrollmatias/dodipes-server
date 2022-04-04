import { <FTName | pascalcase> } from './<FTName | kebabcase>.use-case';
import { repository } from '../../../infraestructure/repositories/mongodb';

export const <FTName | camelcase>UseCase = new <FTName | pascalcase>({
  repositories: { repository },
});
