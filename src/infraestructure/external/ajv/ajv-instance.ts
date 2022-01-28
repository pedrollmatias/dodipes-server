import Ajv, { Options } from 'ajv';
import ajvKeywords from 'ajv-keywords';

const config: Options = {
  removeAdditional: 'all',
};

const ajv = new Ajv(config);

ajvKeywords(ajv);

export default ajv;
