import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
import appLogger from "../logger/appLogger.js";

configDotenv();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        appLogger.info("Database connected successfully")
        return client.db("sample_mflix");
    } catch (e) {
        console.error("Error connecting to MongoDB: ", e);
    }
}

const db = await connectDB();

export default db;