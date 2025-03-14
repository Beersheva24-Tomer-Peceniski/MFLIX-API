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

movieRoute.get("/most-commented", async (req, res) => {
    appLogger.info("Get most commented movies requested");
    const filters = req.body;
    const movies = await movieService.getMostCommentedMovies(filters);
    res.send(movies);
})

movieRoute.get("/:id", async (req, res) => {
    appLogger.info("Get movie from ID requested");
    const movieId = new ObjectId(req.params.id);
    const movie = await movieService.getMovieById(movieId)
    res.send(movie);
})

movieRoute.post("/rating", async (req, res) => {
    appLogger.info("Post new rate requested");
    const ratingInfo = req.body;
    const changedMovies = await movieService.addRate(ratingInfo);
    res.status(200).json({
        message: "Rating updated successfully",
        modifiedCount: changedMovies
    });
})

export default movieRoute;