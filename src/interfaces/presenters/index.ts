import { ObjectId } from 'mongodb';
import { AddUserPresenter } from './add-user.presenter';
import { AuthUserPresenter } from './auth-user.presenter';
import { CheckStorenameAvailabilityPresenter } from './check-storename-availability.presenter';
import { GetStoresByUserPresenter } from './get-stores-by-user.presenter';
import { GetUserByEmailPresenter } from './get-user-by-email.presenter';

const addUserPresenter = new AddUserPresenter<ObjectId>();
const authUserPresenter = new AuthUserPresenter();
const checkStorenameAvailabilityPresenter = new CheckStorenameAvailabilityPresenter();
const getStoresByUserPresenter = new GetStoresByUserPresenter();
const getUserByEmailPresenter = new GetUserByEmailPresenter();

export {
  addUserPresenter,
  authUserPresenter,
  checkStorenameAvailabilityPresenter,
  getStoresByUserPresenter,
  getUserByEmailPresenter,
};
