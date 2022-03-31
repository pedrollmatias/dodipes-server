import { AddCategoryController } from './add-category.controller';
import { AddStoreController } from './add-store.controller';
import { AddUserController } from './add-user.controller';
import { AuthUserController } from './auth-user.controller';
import { CheckStorenameAvailabilityController } from './check-storename-availability.controller';
import { GetAddressByZipCodeController } from './get-address-by-zip-code.controller';
import { GetStoresByUserController } from './get-stores-by-user.controller';
import { GetUserByEmailController } from './get-user-by-email.controller';

const addCategoryController = new AddCategoryController();
const addStoreController = new AddStoreController();
const addUserController = new AddUserController();
const authUserController = new AuthUserController();
const checkStorenameAvailabilityController = new CheckStorenameAvailabilityController();
const getAddressByZipCodeContoller = new GetAddressByZipCodeController();
const getStoresByUserController = new GetStoresByUserController();
const getUsetByEmailController = new GetUserByEmailController();

export {
  addCategoryController,
  addStoreController,
  addUserController,
  authUserController,
  checkStorenameAvailabilityController,
  getAddressByZipCodeContoller,
  getStoresByUserController,
  getUsetByEmailController,
};
