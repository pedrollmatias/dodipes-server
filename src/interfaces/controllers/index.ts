import { AddUserController } from './add-user.controller';
import { AuthUserController } from './auth-user.controller';
import { GetUserByEmailController } from './get-user-by-email.controller';

const addUserController = new AddUserController();
const authUserController = new AuthUserController();
const getUsetByEmailController = new GetUserByEmailController();

export { addUserController, authUserController, getUsetByEmailController };
