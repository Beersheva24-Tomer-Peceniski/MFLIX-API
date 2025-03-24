import express from "express";
import { configDotenv } from "dotenv";
import movieRoute from "../routes/movieRoute.js";
import appLogger from "../logger/appLogger.js";
import requestLogger from "../logger/requestLogger.js";
import { errorHandler } from "../errors/errors.js";
import accountRoute from "../routes/accountRoute.js";
import commentRoute from "../routes/commentRoute.js";
import favoriteRoute from "../routes/favoriteRoute.js";
import { authenticate } from "../middlewares/auth.js";

configDotenv()
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(authenticate());

app.use("/movies", movieRoute);
app.use("/comments", commentRoute);
app.use("/accounts", accountRoute)
app.use("/favorites", favoriteRoute)

app.listen(port, () => appLogger.info(`Server is listening on the port ${port}`))
app.use(errorHandler);