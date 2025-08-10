import express from "express";
import movieService from "../services/moviesService.js";
import appLogger from "../logger/appLogger.js";
import movieSchemas from "../schemas/movieSchemas.js";
import { validator } from "../middlewares/validation.js";
import authRules from "../security/authRules.js";
import { auth } from "../middlewares/auth.js";

const movieRoute = express.Router();

movieRoute.get("/", auth(authRules.movies.get), async (req, res) => {
    appLogger.info("Paginated movies requested");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const year = req.query.year ? parseInt(req.query.year) : null;
    const movieTitle = req.query.movieTitle || null;
    const sortOrder = req.query.sortOrder || 'desc';

    const result = await movieService.getPaginated(page, limit, { year, movieTitle, sortOrder });
    res.send(result);
});

movieRoute.get("/most-rated", auth(authRules.movies.get), validator(movieSchemas.filterMoviesSchema), async (req, res) => {
    appLogger.info("Get most rated movies requested");
    const movies = await movieService.getMostRated(req.body);
    res.send(movies);
})

movieRoute.get("/most-commented", auth(authRules.movies.get), validator(movieSchemas.filterMoviesSchema), async (req, res) => {
    appLogger.info("Get most commented movies requested");
    const filters = req.body;
    const movies = await movieService.getMostCommented(filters);
    res.send(movies);
})

movieRoute.get("/:id", auth(authRules.movies.get), validator(movieSchemas.movieIdSchema, "params"), async (req, res, next) => {
    try {
        appLogger.info("Get movie from ID requested");
        const movie = await movieService.getById(req.params.id)
        res.send(movie);
    } catch (e) {
        next(e);
    }
})

movieRoute.post("/rating", auth(authRules.movies.post), validator(movieSchemas.ratingMovieSchema), async (req, res) => {
    appLogger.info("Post new rate requested");
    const ratingInfo = req.body;
    const changedMovies = await movieService.addRate(ratingInfo);
    res.status(200).json({
        message: "Rating updated successfully",
        modifiedCount: changedMovies
    });
})

export default movieRoute;