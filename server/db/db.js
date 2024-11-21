import { MongoClient } from "mongodb"
import "dotenv/config"

let client

const getDb = async () => {
  if (!client) {
    try {
      client = new MongoClient(process.env.MONGO_URI)
      await client.connect()
      console.log("Connected to MongoDB")
    } catch (err) {
      console.error("Error while connecting to the database", err)
      throw err
    }
  }

  return client.db(process.env.DATABASE_NAME)
}

export default getDb
