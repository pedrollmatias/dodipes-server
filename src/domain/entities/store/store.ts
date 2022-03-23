import { Either, left, right } from '../../../core/either';
import { Address, TAddressErrors } from '../../shared/address/address';
import { Entity } from '../../shared/entity';
import { ImageProcessor } from '../../shared/image/image-processor';
import { TValidDateErrors, ValidDate } from '../../shared/valid-date';
import { StoreMedia, TStoreMediaErrors } from './store-media';
import { StoreName, TStoreNameErrors } from './store-name';
import { IDomainStore } from './store.types';
import { Storename, TStorenameErrors } from './storename';

export interface IStoreProps {
  address: Address;
  createdAt: ValidDate;
  media?: StoreMedia;
  modifiedAt?: ValidDate;
  name: StoreName;
  storename: Storename;
}

export type TStoreErrors = TStoreNameErrors | TStorenameErrors | TAddressErrors | TStoreMediaErrors | TValidDateErrors;

export class Store extends Entity<IStoreProps> {
  get value(): IDomainStore {
    return {
      _id: this._id,
      address: this.props.address.value,
      createdAt: this.props.createdAt.props.date,
      name: this.props.name.value,
      storename: this.props.storename.value,
      media: this.props.media?.value,
      modifiedAt: this.props.modifiedAt?.props?.date,
    };
  }

  static async create({
    data,
    imageProcessor,
  }: {
    data: IDomainStore;
    imageProcessor: ImageProcessor;
  }): Promise<Either<TStoreErrors, Store>> {
    const { _id, address, createdAt, name, storename, media, modifiedAt } = data;

    const addressOrError = Address.create({ address });

    if (addressOrError.isLeft()) {
      return left(addressOrError.value);
    }

    const createdAtOrError = ValidDate.create({ date: createdAt, label: 'data de criação do estabelecimento' });

    if (createdAtOrError.isLeft()) {
      return left(createdAtOrError.value);
    }

    const nameOrError = StoreName.create({ storeName: name });

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    const storenameOrError = Storename.create({ storename });

    if (storenameOrError.isLeft()) {
      return left(storenameOrError.value);
    }

    const mediaOrError = await StoreMedia.create({ media, imageProcessor });

    if (mediaOrError.isLeft()) {
      return left(mediaOrError.value);
    }

    let modifiedAtValue;

    if (modifiedAt) {
      const modifiedAtOrError = ValidDate.create({ date: modifiedAt, label: 'data de modificação do estabelecimento' });

      if (modifiedAtOrError.isLeft()) {
        return left(modifiedAtOrError.value);
      }

      modifiedAtValue = modifiedAtOrError.value;
    }

    return right(
      new Store(
        {
          address: addressOrError.value,
          createdAt: createdAtOrError.value,
          name: nameOrError.value,
          storename: storenameOrError.value,
          media: mediaOrError.value,
          modifiedAt: modifiedAtValue,
        },
        _id
      )
    );
  }
}
