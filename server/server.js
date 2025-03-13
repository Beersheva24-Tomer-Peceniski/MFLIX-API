import express from "express";
import { configDotenv } from "dotenv";
import movieRoute from "../routes/MovieRoute.js";

configDotenv()
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use("/movies", movieRoute);

app.listen(port, () => console.log(`Server is listening on the port ${port}`))