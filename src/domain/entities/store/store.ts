import { Either, left, right } from '../../../core/either';
import { Address, TAddressErrors } from '../../shared/address/address';
import { Entity } from '../../shared/entity';
import { Image, TImageErrors } from '../../shared/image/image';
import { ImageProcessor } from '../../shared/image/image-processor';
import { TValidDateErrors, ValidDate } from '../../shared/valid-date';
import { StoreName, TStoreNameErrors } from './store-name';
import { IDomainStore } from './store.types';
import { Storename, TStorenameErrors } from './storename';

export interface IStoreProps {
  address: Address;
  createdAt: ValidDate;
  logo?: Image;
  coverPhoto?: Image;
  modifiedAt?: ValidDate;
  name: StoreName;
  storename: Storename;
}

export type TStoreErrors = TStoreNameErrors | TStorenameErrors | TAddressErrors | TImageErrors | TValidDateErrors;

export class Store extends Entity<IStoreProps> {
  get value(): IDomainStore {
    return {
      _id: this._id,
      address: this.props.address.value,
      coverPhoto: this.props.coverPhoto?.value,
      createdAt: this.props.createdAt.props.date,
      logo: this.props.coverPhoto?.value,
      name: this.props.name.value,
      storename: this.props.storename.value,
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
    const { _id, address, createdAt, name, storename, logo, coverPhoto, modifiedAt } = data;

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

    let coverPhotoValue: Image | undefined, logoValue: Image | undefined, modifiedAtValue: ValidDate | undefined;

    if (modifiedAt) {
      const modifiedAtOrError = ValidDate.create({ date: modifiedAt, label: 'data de modificação do estabelecimento' });

      if (modifiedAtOrError.isLeft()) {
        return left(modifiedAtOrError.value);
      }

      modifiedAtValue = modifiedAtOrError.value;
    }

    if (coverPhoto) {
      const coverPhotoOrError = await Image.create({
        image: coverPhoto,
        imageProcessor,
        validationOptions: { aspectRatio: [1, 1] },
      });

      if (coverPhotoOrError.isLeft()) {
        return left(coverPhotoOrError.value);
      }

      coverPhotoValue = coverPhotoOrError.value;
    }

    if (logo) {
      const logoOrError = await Image.create({
        image: logo,
        imageProcessor,
        validationOptions: { aspectRatio: [1, 1] },
      });

      if (logoOrError.isLeft()) {
        return left(logoOrError.value);
      }

      logoValue = logoOrError.value;
    }

    return right(
      new Store(
        {
          address: addressOrError.value,
          createdAt: createdAtOrError.value,
          name: nameOrError.value,
          storename: storenameOrError.value,
          logo: logoValue,
          coverPhoto: coverPhotoValue,
          modifiedAt: modifiedAtValue,
        },
        _id
      )
    );
  }
}
