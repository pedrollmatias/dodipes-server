import { AddUserController } from './add-user.controller';
import { AuthUserController } from './auth-user.controller';

const addUserController = new AddUserController();
const authUserController = new AuthUserController();

export { addUserController, authUserController };
