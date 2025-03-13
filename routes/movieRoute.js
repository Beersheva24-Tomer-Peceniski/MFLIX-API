import express from "express";
import { ObjectId } from "mongodb";
import movieService from "../services/MovieServices.js";

const movieRoute = express.Router();

movieRoute.get("/:id", async (req, res) => {
    const movieId = new ObjectId(req.params.id);
    const movie = await movieService.getMovieById(movieId) 
    res.send(movie);
})

export default movieRoute;