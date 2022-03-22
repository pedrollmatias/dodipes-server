import { ObjectId } from 'mongodb';
import { AddUserPresenter } from './add-user.presenter';
import { AuthUserPresenter } from './auth-user.presenter';
import { GetUserByEmailPresenter } from './get-user-by-email.presenter';

const addUserPresenter = new AddUserPresenter<ObjectId>();
const authUserPresenter = new AuthUserPresenter();
const getUserByEmailPresenter = new GetUserByEmailPresenter();

export { addUserPresenter, authUserPresenter, getUserByEmailPresenter };
