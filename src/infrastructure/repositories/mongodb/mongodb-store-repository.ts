import { ObjectId } from 'mongodb';
import {
  IAcceptStoreInvitationUpdate,
  IRepositoryStore,
  IRepositoryStoreByUser,
  IRepositoryStoreUser,
  StoreRepository,
} from '../../../application/repositories/store-repository';
import { IInsertionDTO } from '../../../application/shared/output-dto';
import { mediaToStringBase64, stringBase64ToMedia } from '../../../core/utils';
import { storeUserInvitationStatusEnum } from '../../../domain/entities/store-user/invitation-status';
import { MongoHelper } from './helpers/mongo-helper';
import { MongodbRepository } from './mongodb-repository';

const storeCollectionName = 'stores';

export class MongodbStoreRepository extends MongodbRepository implements StoreRepository<ObjectId> {
  async findById(storeId: ObjectId): Promise<IRepositoryStore<ObjectId> | null> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne({ _id: storeId });

    return <IRepositoryStore<ObjectId>>store;
  }

  async findByIdAndUserId(storeId: ObjectId, userId: ObjectId): Promise<IRepositoryStoreByUser<ObjectId> | null> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne({ 'users._id': userId, _id: storeId });

    return <IRepositoryStoreByUser<ObjectId>>store;
  }

  async findAllByUserId(userId: ObjectId): Promise<IRepositoryStoreByUser<ObjectId>[]> {
    const storesCursor = MongoHelper.getCollection(storeCollectionName).find({ 'users._id': userId });
    const stores = await storesCursor
      .map((store) => {
        const coverPhoto = store.coverPhoto ? mediaToStringBase64(store.coverPhoto) : undefined;
        const logo = store.logo ? mediaToStringBase64(store.logo) : undefined;

        return { ...store, logo, coverPhoto };
      })
      .toArray();

    return <IRepositoryStoreByUser<ObjectId>[]>stores;
  }

  async findByStorename(storename: string): Promise<IRepositoryStoreByUser<ObjectId> | null> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne({ storename });

    return <IRepositoryStoreByUser<ObjectId>>store;
  }

  insertOne(
    store: IRepositoryStore<ObjectId>,
    adminUser: IRepositoryStoreUser<ObjectId>
  ): Promise<IInsertionDTO<ObjectId>> {
    const coverPhotoMedia = store.coverPhoto && stringBase64ToMedia(store.coverPhoto);
    const logoMedia = store.logo && stringBase64ToMedia(store.logo);

    return MongoHelper.getCollection(storeCollectionName).insertOne({
      ...store,
      coverPhoto: coverPhotoMedia,
      logo: logoMedia,
      users: [adminUser],
    });
  }

  async insertGuestUser(storeId: ObjectId, user: IRepositoryStoreUser<ObjectId>): Promise<IInsertionDTO<ObjectId>> {
    const { _id } = user;

    await MongoHelper.getCollection(storeCollectionName).updateOne({ _id: storeId }, { $push: { users: user } });

    return { insertedId: _id };
  }

  async isAdminUser(storeId: ObjectId, userId: ObjectId): Promise<boolean> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne({
      _id: storeId,
      'users._id': userId,
      isAdmin: true,
    });

    return Boolean(store);
  }

  async userHasPendingInvitation(storeId: ObjectId, userId: ObjectId): Promise<boolean> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne({
      _id: storeId,
      'users._id': { _id: userId, inviteStatus: storeUserInvitationStatusEnum.PENDING },
    });

    return Boolean(store);
  }

  async updateUserInvitation(storeId: ObjectId, userId: ObjectId, update: IAcceptStoreInvitationUpdate): Promise<void> {
    await MongoHelper.getCollection(storeCollectionName).updateOne(
      { _id: storeId, 'users._id': userId },
      { 'users.$.inviteStatus': update.status, 'users.$.inviteFeedbackAt': update.invitationFeedbackAt }
    );
  }
}
