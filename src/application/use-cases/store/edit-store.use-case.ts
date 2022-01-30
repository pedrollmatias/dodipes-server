import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { ImageProcessor } from '../../../domain/shared/image-processor';
import { Store } from '../../../domain/store/store';
import { IAddress, IDomainStore, IStoreMedia } from '../../../domain/store/store.types';
import { TUpdateResponse } from '../../shared/update-reponse';
import { StoreRepository } from './store-repository';

export interface IEditStoreRequest {
  params: {
    storeId: string;
  };
  body: {
    address?: IAddress;
    name?: string;
    media?: IStoreMedia;
  };
}

export interface IEditStoreRepositories {
  storeRepository: StoreRepository;
}

export interface IEditStoreExternalInterfaces {
  imageProcessor: ImageProcessor;
}

export class EditStore {
  private readonly storeRepository: StoreRepository;

  private readonly imageProcessor: ImageProcessor;

  constructor({
    repositories,
    externalInterfaces,
  }: {
    repositories: IEditStoreRepositories;
    externalInterfaces: IEditStoreExternalInterfaces;
  }) {
    const { storeRepository } = repositories;
    const { imageProcessor } = externalInterfaces;

    this.storeRepository = storeRepository;
    this.imageProcessor = imageProcessor;
  }

  async handle({ input }: { input: IEditStoreRequest }): Promise<TUpdateResponse> {
    const {
      params: { storeId },
      body: { address, media, name },
    } = input;

    const findStoreResult = await this.storeRepository.findById(storeId);

    this.validateStoreExistence(findStoreResult);

    const preUpdateStore = <IDomainStore>findStoreResult;

    const now = new Date();
    const update = {
      ...(address && { address }),
      ...(name && { name }),
      media: {
        ...preUpdateStore.media,
        ...(media?.logo && { ...media.logo }),
        ...(media?.coverPhoto && { ...media.coverPhoto }),
      },
      modifiedAt: now,
    };

    await Store.create({
      data: {
        ...preUpdateStore,
        ...update,
      },
      imageProcessor: this.imageProcessor,
    });

    return this.storeRepository.updateOne(storeId, update);
  }

  validateStoreExistence(store: IDomainStore | null): void {
    if (!store) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_FOUND,
        message: 'Estabelecimento não encontrado',
      };
    }
  }
}
