import express from "express";
import { ObjectId } from "mongodb";
import moviesService from "../services/moviesService.js";
import appLogger from "../logger/appLogger.js";

const moviesRoute = express.Router();

moviesRoute.get("/most-rated", async (req, res) => {
    appLogger.info("Get most rated movies requested");
    const filters = req.body;
    const movies = await moviesService.getMostRatedMovies(filters);
    res.send(movies);
})

moviesRoute.get("/most-commented", async (req, res) => {
    appLogger.info("Get most commented movies requested");
    const filters = req.body;
    const movies = await moviesService.getMostCommentedMovies(filters);
    res.send(movies);
})

moviesRoute.get("/:id", async (req, res) => {
    appLogger.info("Get movie from ID requested");
    const movieId = new ObjectId(req.params.id);
    const movie = await moviesService.getMovieById(movieId)
    res.send(movie);
})

moviesRoute.post("/rating", async (req, res) => {
    appLogger.info("Post new rate requested");
    const ratingInfo = req.body;
    const changedMovies = await moviesService.addRate(ratingInfo);
    res.status(200).json({
        message: "Rating updated successfully",
        modifiedCount: changedMovies
    });
})

export default moviesRoute;