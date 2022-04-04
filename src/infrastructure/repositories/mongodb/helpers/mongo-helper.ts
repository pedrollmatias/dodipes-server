import { MongoClient, Collection, ObjectId } from 'mongodb';

export const MongoHelper = {
  client: null as unknown as MongoClient,
  clearCollection(name: string): void {
    this.client.db().collection(name).deleteMany({});
  },
  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },
  disconnect(): void {
    this.client.close();
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },
  getNextId(): ObjectId {
    return new ObjectId();
  },
  objectIdToString(objectId: ObjectId): string {
    return objectId.toString();
  },
};
