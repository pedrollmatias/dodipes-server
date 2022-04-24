import { ObjectId } from 'mongodb';
import { AcceptStoreInvitationPresenter } from './accept-store-invitation.presenter';
import { AddCategoryPresenter } from './add-category.presenter';
import { AddItemPresenter } from './add-item.presenter';
import { AddStorePresenter } from './add-store.presenter';
import { AddUserPresenter } from './add-user.presenter';
import { AuthUserPresenter } from './auth-user.presenter';
import { CheckStorenameAvailabilityPresenter } from './check-storename-availability.presenter';
import { DeclineStoreInvitationPresenter } from './decline-store-invitation.presenter';
import { EditCategoryPresenter } from './edit-category.presenter';
import { GetAddressByZipCodePresenter } from './get-address-by-zip-code.presenter';
import { GetStoreCategoriesWithItemsPresenter } from './get-store-categories-with-items.presenter';
import { GetStoresByUserPresenter } from './get-stores-by-user.presenter';
import { GetUserByEmailPresenter } from './get-user-by-email.presenter';
import { InviteUserToStorePresenter } from './invite-user-to-store.presenter';
import { RemoveCategoryPresenter } from './remove-category.presenter';

const acceptStoreInvitationPresenter = new AcceptStoreInvitationPresenter();
const addCategoryPresenter = new AddCategoryPresenter();
const addItemPresenter = new AddItemPresenter();
const addStorePresenter = new AddStorePresenter();
const addUserPresenter = new AddUserPresenter<ObjectId>();
const authUserPresenter = new AuthUserPresenter();
const checkStorenameAvailabilityPresenter = new CheckStorenameAvailabilityPresenter();
const declineStoreInvitationPresenter = new DeclineStoreInvitationPresenter();
const editCategoryPresenter = new EditCategoryPresenter();
const getAddressByZipCodePresenter = new GetAddressByZipCodePresenter();
const getStoreCategoriesWithItemsPresenter = new GetStoreCategoriesWithItemsPresenter();
const getStoresByUserPresenter = new GetStoresByUserPresenter();
const getUserByEmailPresenter = new GetUserByEmailPresenter();
const inviteUserToStorePresenter = new InviteUserToStorePresenter();
const removeCategoryPresenter = new RemoveCategoryPresenter();

export {
  acceptStoreInvitationPresenter,
  addCategoryPresenter,
  addItemPresenter,
  addStorePresenter,
  addUserPresenter,
  authUserPresenter,
  checkStorenameAvailabilityPresenter,
  declineStoreInvitationPresenter,
  editCategoryPresenter,
  getAddressByZipCodePresenter,
  getStoreCategoriesWithItemsPresenter,
  getStoresByUserPresenter,
  getUserByEmailPresenter,
  inviteUserToStorePresenter,
  removeCategoryPresenter,
};
