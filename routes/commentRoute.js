import express from "express";
import commentService from "../services/commentsService.js";
import appLogger from "../logger/appLogger.js";
import { movieIdSchema } from "../schemas/movieSchemas.js";
import { createError } from "../errors/errors.js";
import commentSchemas from "../schemas/commentSchemas.js";
import { validator } from "../middlewares/validation.js";
import authRules from "../security/authRules.js";
import { auth } from "../middlewares/auth.js";

const commentRoute = express.Router();

commentRoute.get("/", auth(authRules.comments.get), async (req, res, next) => {
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
    return { status: 200, result: await commentService.getByEmail(email) }
}

async function getCommentsByMovieId(movieId) {
    appLogger.info("Get comments by movie ID requested");
    const { error } = movieIdSchema.validate({ movieId });
    if (error) {
        throw createError(400, error.details.map(d => d.message).join(";"))
    }
    return { status: 200, result: await commentService.getByMovieId(movieId) }
}

commentRoute.post("/", auth(authRules.comments.post), validator(commentSchemas.addCommentSchema), async (req, res) => {
    appLogger.info("Post new comment requested");
    const comment = await commentService.add(req.body);
    res.send(comment);
})

commentRoute.put("/", auth(authRules.comments.put), validator(commentSchemas.updateCommentSchema), async (req, res, next) => {
    appLogger.info("Update comment requested");
    try {
        const comment = await commentService.update(req.body);
        res.send(comment);
    } catch (error) {
        next(error)
    }
})

commentRoute.delete("/:commentId", auth(authRules.comments.delete), validator(commentSchemas.commentIdSchema, "params"), async (req, res, next) => {
    appLogger.info("Delete comment requested");
    try {
        const deletedComment = await commentService.delete(req.params.commentId);
        res.send(deletedComment);
    } catch (error) {
        next(error)
    }
})

export default commentRoute;