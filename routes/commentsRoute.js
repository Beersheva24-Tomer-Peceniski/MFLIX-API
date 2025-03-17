import express from "express";
import commentsService from "../services/commentsService.js";
import appLogger from "../logger/appLogger.js";
import { movieIdSchema } from "../validation-schemas/movie-schemas.js";
import { createError } from "../errors/errors.js";
import commentSchemas from "../validation-schemas/comment-schemas.js";

const commentsRoute = express.Router();

commentsRoute.get("/", async (req, res, next) => {
    try {
        let result;
        let status;
        if (req.query.movieId) {
            ({ status, result } = await getCommentsByMovieId(req.query.movieId))
        } else if (req.query.email) {
            ({ status, result } = await getCommentsByEmail(req.query.email))
        } else {
            throw createError(400, "Missing required query parameters: movieId or email");
        }
        res.status(status).send(result);

    } catch (error) {
        next(error)
    }
})

async function getCommentsByEmail(email) {
    appLogger.info("Get comments by email requested");
    const { error } = commentSchemas.emailSchema.validate({ email });
    if (error) {
        throw createError(400, error.details.map(d => d.message).join(";"))
    }
    return { status: 200, result: await commentsService.getCommentsByEmail(email) }
}

async function getCommentsByMovieId(movieId) {
    appLogger.info("Get comments by movie ID requested");
    const { error } = movieIdSchema.validate({ movieId });
    if (error) {
        throw createError(400, error.details.map(d => d.message).join(";"))
    }
    return { status: 200, result: await commentsService.getCommentsByMovieId(movieId) }
}

commentsRoute.post("/", async (req, res) => {
    appLogger.info("Post new comment requested");
    const comment = await commentsService.addComment(req.body);
    res.send(comment);
})

commentsRoute.put("/", async (req, res) => {
    appLogger.info("Update comment requested");
    const comment = await commentsService.updateComment(req.body);
    res.send(comment);
})

commentsRoute.delete("/:id", async (req, res) => {
    appLogger.info("Delete comment requested");
    const deletedComment = await commentsService.deleteCommentById(req.params.id);
    res.send(deletedComment);
})

export default commentsRoute;