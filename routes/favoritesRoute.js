import express from "express";
import appLogger from "../logger/appLogger.js";
import favoriteSchemas from "../validation-schemas/favorite-schemas.js";
import favoritesService from "../services/favoritesService.js";
import { validator } from "../middleware/validation.js";

const favoritesRoute = express.Router();

favoritesRoute.post("/", validator(favoriteSchemas.addFavoriteSchema), async (req, res, next) => {
    appLogger.info("Add favorite requested")
    try {
        const addedFavorite = await favoritesService.addFavorite(req.body);
        res.status(201).send(addedFavorite);
    } catch (error) {
        next(error)
    }
})

export default favoritesRoute;