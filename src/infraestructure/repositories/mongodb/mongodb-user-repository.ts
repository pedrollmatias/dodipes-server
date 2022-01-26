import { MongoHelper } from "./helpers/mongo-helper";
import { IUserData } from "../../../domain/user/user-data";
import { UserRepository } from "../../../application/use-cases/user/user-repository";
import { Document, Filter } from "mongodb";
import { TInsertResponse } from "../../../application/helpers/insert-response";

const userCollectionName = "users";

export class MongodbUserRepository implements UserRepository {
  async findOne(query: Filter<Document>): Promise<IUserData | null> {
    const user = await MongoHelper.getCollection(userCollectionName).findOne(query);

    return <IUserData>(<unknown>user);
  }

  async insertOne(user: IUserData): Promise<TInsertResponse> {
    const inserted = await MongoHelper.getCollection(userCollectionName).insertOne(
      user
    );

    return { insertedId: inserted.insertedId.toString() };
  }

  async exists(query: Filter<Document>): Promise<boolean> {
    const result = await this.findOne(query);

    return Boolean(result);
  }
}
