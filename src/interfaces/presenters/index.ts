import { ObjectId } from 'mongodb';
import { AddStorePresenter } from './add-store.presenter';
import { AddUserPresenter } from './add-user.presenter';
import { AuthUserPresenter } from './auth-user.presenter';
import { CheckStorenameAvailabilityPresenter } from './check-storename-availability.presenter';
import { GetAddressByZipCodePresenter } from './get-address-by-zip-code.presenter';
import { GetStoresByUserPresenter } from './get-stores-by-user.presenter';
import { GetUserByEmailPresenter } from './get-user-by-email.presenter';

const addStorePresenter = new AddStorePresenter();
const addUserPresenter = new AddUserPresenter<ObjectId>();
const authUserPresenter = new AuthUserPresenter();
const checkStorenameAvailabilityPresenter = new CheckStorenameAvailabilityPresenter();
const getAddressByZipCodePresenter = new GetAddressByZipCodePresenter();
const getStoresByUserPresenter = new GetStoresByUserPresenter();
const getUserByEmailPresenter = new GetUserByEmailPresenter();

export {
  addStorePresenter,
  addUserPresenter,
  authUserPresenter,
  checkStorenameAvailabilityPresenter,
  getAddressByZipCodePresenter,
  getStoresByUserPresenter,
  getUserByEmailPresenter,
};
