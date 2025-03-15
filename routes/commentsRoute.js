import express from "express";
import commentsService from "../services/commentsService.js";
import appLogger from "../logger/appLogger.js";

const commentssRoute = express.Router();

commentssRoute.get("/:id", async (req, res) => {
    appLogger.info("Get comments requested");
    const comments = await commentsService.getComments(req.params.id);
    res.send(comments);
})

export default commentssRoute;