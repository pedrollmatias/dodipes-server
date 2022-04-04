import AjvCompiler from '@fastify/ajv-compiler';
import ajvFormats from 'ajv-formats';

export default {
  ajv: {
    plugins: [ajvFormats],
  },
  schemaController: {
    compilersFactory: {
      buildValidator: AjvCompiler(),
    },
  },
};
