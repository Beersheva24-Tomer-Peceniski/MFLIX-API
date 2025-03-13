import express from "express";
import { ObjectId } from "mongodb";
import movieService from "../services/MovieServices.js";
import appLogger from "../logger/appLogger.js";

const movieRoute = express.Router();

movieRoute.get("/:id", async (req, res) => {
    appLogger.info("Get movie from ID route requested");
    const movieId = new ObjectId(req.params.id);
    const movie = await movieService.getMovieById(movieId) 
    res.send(movie);
})

export default movieRoute;