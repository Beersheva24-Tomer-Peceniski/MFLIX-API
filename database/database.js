import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
import appLogger from "../logger/appLogger.js";

configDotenv();
const mongoPassword = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://tomerpeceniski:${mongoPassword}@cluster0.hwc10.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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

export default connectDB; 