import { BcryptHasher } from './bcrypt-hasher';
import { JimpImageProcessor } from './jimp-image-processor';
import { JwtTokenHandler } from './jwt-token-handler';
import { ViaCepZipCodeApi } from './viacep-zip-code-api';

const bcryptHasher = new BcryptHasher();
const jimpImageProcessor = new JimpImageProcessor();
const jwtTokenHandler = new JwtTokenHandler();
const viaCepZipCodeApi = new ViaCepZipCodeApi();

export { bcryptHasher, jimpImageProcessor, jwtTokenHandler, viaCepZipCodeApi };
