import { IDomainTable } from '../../../domain/table/table.types';
import { TInsertResponse } from '../../shared/insert-response';

export abstract class TableRepository {
  abstract findByNumber(storeId: string, tableNumber: number): Promise<IDomainTable | null>;

  abstract getNextId(): string;

  abstract insertOne(storeId: string, tableData: IDomainTable): Promise<TInsertResponse>;
}
