import { Either, left, right } from '../../../core/either';
import { Entity } from '../../shared/entity';
import { Image, TImageErrors } from '../../shared/image/image';
import { ImageProcessor } from '../../shared/image/image-processor';
import { TValidDateErrors, ValidDate } from '../../shared/valid-date';
import { IDomainItem } from './item.types';
import { Price, TPriceErrors } from './price';

export interface IItemProps {
  categoryId: string;
  name: string;
  description?: string;
  price: Price;
  active?: boolean;
  createdAt: ValidDate;
  modifiedAt?: ValidDate;
  media?: Image;
}

export type TItemErrors = TPriceErrors | TImageErrors | TValidDateErrors;

export class Item extends Entity<IItemProps> {
  get value(): IDomainItem {
    return {
      _id: this._id,
      categoryId: this.props.categoryId,
      createdAt: this.props.createdAt.value.date,
      name: this.props.name,
      description: this.props.description,
      price: this.props.price.value,
      active: this.props.active,
      media: this.props.media?.value,
      modifiedAt: this.props.modifiedAt?.value.date,
    };
  }

  static async create({
    data,
    imageProcessor,
  }: {
    data: IDomainItem;
    imageProcessor: ImageProcessor;
  }): Promise<Either<TItemErrors, Item>> {
    const { _id, categoryId, createdAt, name, price, active, description, media, modifiedAt } = data;

    const priceOrError = Price.create({ price });

    if (priceOrError.isLeft()) {
      return left(priceOrError.value);
    }

    const createdAtOrError = ValidDate.create({ date: createdAt, label: 'data de criação do item' });

    if (createdAtOrError.isLeft()) {
      return left(createdAtOrError.value);
    }

    let mediaValue: Image | undefined, modifiedAtValue: ValidDate | undefined;

    if (media) {
      const mediaOrError = await Image.create({
        image: media,
        imageProcessor,
        validationOptions: { aspectRatio: [15, 10] },
      });

      if (mediaOrError.isLeft()) {
        return left(mediaOrError.value);
      }

      mediaValue = mediaOrError.value;
    }

    if (modifiedAt) {
      const modifiedAtOrError = ValidDate.create({ date: modifiedAt, label: 'data de modificação do estabelecimento' });

      if (modifiedAtOrError.isLeft()) {
        return left(modifiedAtOrError.value);
      }

      modifiedAtValue = modifiedAtOrError.value;
    }

    return right(
      new Item(
        {
          categoryId,
          createdAt: createdAtOrError.value,
          name,
          price: priceOrError.value,
          active,
          description,
          media: mediaValue,
          modifiedAt: modifiedAtValue,
        },
        _id
      )
    );
  }
}
