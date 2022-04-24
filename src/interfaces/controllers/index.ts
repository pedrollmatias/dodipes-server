import { AcceptStoreInvitationController } from './accept-store-invitation.controller';
import { AddCategoryController } from './add-category.controller';
import { AddItemController } from './add-item.controller';
import { AddStoreController } from './add-store.controller';
import { AddUserController } from './add-user.controller';
import { AuthUserController } from './auth-user.controller';
import { CheckStorenameAvailabilityController } from './check-storename-availability.controller';
import { DeclineStoreInvitationController } from './decline-store-invitation.controller';
import { EditCategoryController } from './edit-category.controller';
import { GetAddressByZipCodeController } from './get-address-by-zip-code.controller';
import { GetStoreCategoriesWithItemsController } from './get-store-categories-with-items.controller';
import { GetStoresByUserController } from './get-stores-by-user.controller';
import { GetUserByEmailController } from './get-user-by-email.controller';
import { InviteUserToStoreController } from './invite-user-to-store.controller';
import { RemoveCategoryController } from './remove-category.controller';

const acceptStoreInvitationController = new AcceptStoreInvitationController();
const addCategoryController = new AddCategoryController();
const addItemController = new AddItemController();
const addStoreController = new AddStoreController();
const addUserController = new AddUserController();
const authUserController = new AuthUserController();
const checkStorenameAvailabilityController = new CheckStorenameAvailabilityController();
const declineStoreInvitationController = new DeclineStoreInvitationController();
const editCategoryController = new EditCategoryController();
const getAddressByZipCodeContoller = new GetAddressByZipCodeController();
const getStoreCategoriesWithItemsController = new GetStoreCategoriesWithItemsController();
const getStoresByUserController = new GetStoresByUserController();
const getUsetByEmailController = new GetUserByEmailController();
const inviteUserToStoreController = new InviteUserToStoreController();
const removeCategoryController = new RemoveCategoryController();

export {
  acceptStoreInvitationController,
  addCategoryController,
  addItemController,
  addStoreController,
  addUserController,
  authUserController,
  checkStorenameAvailabilityController,
  declineStoreInvitationController,
  editCategoryController,
  getAddressByZipCodeContoller,
  getStoreCategoriesWithItemsController,
  getStoresByUserController,
  getUsetByEmailController,
  inviteUserToStoreController,
  removeCategoryController,
};
