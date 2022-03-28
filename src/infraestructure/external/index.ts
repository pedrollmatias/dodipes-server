import { BcryptHasher } from './bcrypt-hasher';
import { JimpImageProcessor } from './jimp-image-processor';
import { JwtTokenHandler } from './jwt-token-handler';

const bcryptHasher = new BcryptHasher();
const jimpImageProcessor = new JimpImageProcessor();
const jwtTokenHandler = new JwtTokenHandler();

export { bcryptHasher, jimpImageProcessor, jwtTokenHandler };
