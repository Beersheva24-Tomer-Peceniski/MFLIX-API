import express from "express";
import moviesService from "../services/moviesService.js";
import appLogger from "../logger/appLogger.js";
import movieSchemas from "../validation-schemas/movie-schemas.js";
import { validator } from "../middleware/validation.js";

const moviesRoute = express.Router();

moviesRoute.get("/most-rated", validator(movieSchemas.filterMoviesSchema), async (req, res) => {
    appLogger.info("Get most rated movies requested");
    const movies = await moviesService.getMostRatedMovies(req.body);
    res.send(movies);
})

moviesRoute.get("/most-commented", validator(movieSchemas.filterMoviesSchema), async (req, res) => {
    appLogger.info("Get most commented movies requested");
    const filters = req.body;
    const movies = await moviesService.getMostCommentedMovies(filters);
    res.send(movies);
})

moviesRoute.get("/:id", validator(movieSchemas.movieIdSchema, "params"), async (req, res, next) => {
    try {
        appLogger.info("Get movie from ID requested");
        const movie = await moviesService.getMovieById(req.params.id)
        res.send(movie);
    } catch (e) {
        next(e);
    }
})

moviesRoute.post("/rating", validator(movieSchemas.ratingMovieSchema), async (req, res) => {
    appLogger.info("Post new rate requested");
    const ratingInfo = req.body;
    const changedMovies = await moviesService.addRate(ratingInfo);
    res.status(200).json({
        message: "Rating updated successfully",
        modifiedCount: changedMovies
    });
})

export default moviesRoute;