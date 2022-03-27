import { AddUserController } from './add-user.controller';
import { AuthUserController } from './auth-user.controller';
import { CheckStorenameAvailabilityController } from './check-storename-availability.controller';
import { GetStoresByUserController } from './get-stores-by-user.controller';
import { GetUserByEmailController } from './get-user-by-email.controller';

const addUserController = new AddUserController();
const authUserController = new AuthUserController();
const checkStorenameAvailabilityController = new CheckStorenameAvailabilityController();
const getStoresByUserController = new GetStoresByUserController();
const getUsetByEmailController = new GetUserByEmailController();

export {
  addUserController,
  authUserController,
  checkStorenameAvailabilityController,
  getStoresByUserController,
  getUsetByEmailController,
};
