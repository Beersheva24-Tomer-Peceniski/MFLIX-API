import express from "express";
import { configDotenv } from "dotenv";
import moviesRoute from "../routes/moviesRoute.js";
import appLogger from "../logger/appLogger.js";
import requestLogger from "../logger/requestLogger.js";
import { errorHandler } from "../errors/errors.js";
import accountsRoute from "../routes/accountsRoute.js";
import commentsRoute from "../routes/commentsRoute.js";

configDotenv()
const port = process.env.PORT || 4000;

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use("/movies", moviesRoute);
app.use("/comments", commentsRoute);
app.use("/accounts", accountsRoute)

app.listen(port, () => appLogger.info(`Server is listening on the port ${port}`))
app.use(errorHandler);