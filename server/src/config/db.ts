import { Db, MongoClient } from "mongodb";

class MongoDatabase {
  private static readonly URL = process.env.DB_URL;
  private static readonly DB_NAME = process.env.DB_NAME;
  private static db: Db | null = null;
  private static mongoClient: MongoClient = new MongoClient(MongoDatabase.URL);

  static async connectToDatabase() {
    try {
      await this.mongoClient.connect();
      MongoDatabase.db = MongoDatabase.mongoClient.db(MongoDatabase.DB_NAME);
      console.log("database is connected");
    } catch (error) {
      console.log(error.message);
      MongoDatabase.db = null;
      console.log("database is not connected");
    }
  }

  static async getDb(): Promise<Db | null> {
    if (MongoDatabase.db?.databaseName) {
      return MongoDatabase.db;
    }
    await MongoDatabase.connectToDatabase();
    return MongoDatabase.db;
  }
}

export default MongoDatabase;
