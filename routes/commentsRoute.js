import express from "express";
import commentsService from "../services/commentsService.js";
import appLogger from "../logger/appLogger.js";

const commentsRoute = express.Router();

commentsRoute.get("/:id", async (req, res) => {
    appLogger.info("Get comments requested");
    const comments = await commentsService.getComments(req.params.id);
    res.send(comments);
})

commentsRoute.post("/", async (req, res) => {
    appLogger.info("Post new comment requested")
    const comment = await commentsService.addComment(req.body);
    res.send(comment);
})

export default commentsRoute;