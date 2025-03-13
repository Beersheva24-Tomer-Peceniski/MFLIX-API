import express from "express";
import { configDotenv } from "dotenv";
import movieRoute from "../routes/MovieRoute.js";
import appLogger from "../logger/appLogger.js";

configDotenv()
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use("/movies", movieRoute);

app.listen(port, () => appLogger.info(`Server is listening on the port ${port}`))