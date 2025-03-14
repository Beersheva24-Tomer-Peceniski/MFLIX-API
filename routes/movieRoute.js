import express from "express";
import { ObjectId } from "mongodb";
import movieService from "../services/MovieServices.js";
import appLogger from "../logger/appLogger.js";

const movieRoute = express.Router();

movieRoute.get("/most-rated", async (req, res) => {
    appLogger.info("Get most rated movies requested");
    const filters = req.body;
    const movies = await movieService.getMostRatedMovies(filters);
    res.send(movies);
})

movieRoute.get("/:id", async (req, res) => {
    appLogger.info("Get movie from ID requested");
    const movieId = new ObjectId(req.params.id);
    const movie = await movieService.getMovieById(movieId)
    res.send(movie);
})

export default movieRoute;