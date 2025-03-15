import express from "express";
import { configDotenv } from "dotenv";
import moviesRoute from "../routes/MoviesRoute.js";
import appLogger from "../logger/appLogger.js";
import requestLogger from "../logger/requestLogger.js";

configDotenv()
const port = process.env.PORT || 4000;

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use("/movies", moviesRoute);

app.listen(port, () => appLogger.info(`Server is listening on the port ${port}`))