import express from "express";
import commentsService from "../services/commentsService.js";
import appLogger from "../logger/appLogger.js";

const commentsRoute = express.Router();

commentsRoute.get("/", async (req, res) => {
    let result;
    let status;
    if (req.query.movieId) {
        appLogger.info("Get comments by movie ID requested");
        result = await commentsService.getCommentsByMovieId(req.query.movieId);
        status = 200
    } else if (req.query.email) {
        appLogger.info("Get comments by email requested");
        result = await commentsService.getCommentsByEmail(req.query.email);
        status = 200
    } else {
        appLogger.info("Get comments requested");
        result = {error: "Missing required query parameters: movieId or email"};
        status = 400;
    }
    res.status(status).send(result);
})

commentsRoute.post("/", async (req, res) => {
    appLogger.info("Post new comment requested")
    const comment = await commentsService.addComment(req.body);
    res.send(comment);
})

commentsRoute.put("/", async (req, res) => {
    appLogger.info("Update comment requested")
    const comment = await commentsService.updateComment(req.body);
    res.send(comment);
})

export default commentsRoute;