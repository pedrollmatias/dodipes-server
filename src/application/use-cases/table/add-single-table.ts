import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { Table } from '../../../domain/table/table';
import { TInsertResponse } from '../../shared/insert-response';
import { StoreRepository } from '../store/store-repository';
import { TableRepository } from './table-repository';

export interface IAddSingleTableRequest {
  params: {
    storeId: string;
  };
  body: {
    number: number;
    active?: boolean;
  };
}

export interface IAddSingleTableRepositories {
  tableRepository: TableRepository;
  storeRepository: StoreRepository;
}

export class AddSingleTable {
  private readonly tableRepository: TableRepository;

  private readonly storeRepository: StoreRepository;

  constructor({ repositories }: { repositories: IAddSingleTableRepositories }) {
    const { storeRepository, tableRepository } = repositories;

    this.storeRepository = storeRepository;
    this.tableRepository = tableRepository;
  }

  async handle({ input }: { input: IAddSingleTableRequest }): Promise<TInsertResponse> {
    const {
      params: { storeId },
      body: { number, active },
    } = input;

    await this.validateStoreExistence(storeId);

    const _id = this.tableRepository.getNextId();

    const table = Table.create({
      _id,
      tableNumber: number,
      active,
    });

    await this.validateTableNumber(storeId, number);

    return this.tableRepository.insertOne(storeId, table.value);
  }

  private async validateStoreExistence(storeId: string): Promise<void> {
    const storeExists = Boolean(await this.storeRepository.findById(storeId));

    if (!storeExists) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'O estabelecimento não existe',
      };
    }
  }

  private async validateTableNumber(storeId: string, tableNumber: number): Promise<void> {
    const findTableResult = await this.tableRepository.findByNumber(storeId, tableNumber);

    if (findTableResult) {
      throw <CustomError>{
        statusCode: ErrorCodes.BAD_REQUEST,
        message: `A mesa ${tableNumber} já existe`,
      };
    }
  }
}
