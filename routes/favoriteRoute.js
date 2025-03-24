import express from "express";
import appLogger from "../logger/appLogger.js";
import favoriteSchemas from "../schemas/favoriteSchemas.js";
import favoriteService from "../services/favoritesService.js";
import { validator } from "../middlewares/validation.js";
import { auth } from "../middlewares/auth.js";
import authRules from "../security/authRules.js";

const favoriteRoute = express.Router();

favoriteRoute.get("/:email", auth(authRules.favorites.get), validator(favoriteSchemas.getByEmailSchema, "params"), async (req, res, next) => {
    appLogger.info("Get favorites by Email requested");
    try {
        const favorites = await favoriteService.getByEmail(req.params.email);
        res.send(favorites);
    } catch (error) {
        next(error);
    }
})

favoriteRoute.post("/", auth(authRules.favorites.post), validator(favoriteSchemas.addSchema), async (req, res, next) => {
    appLogger.info("Add favorite requested")
    try {
        const addedFavorite = await favoriteService.add(req.body);
        res.status(201).send(addedFavorite);
    } catch (error) {
        next(error)
    }
})

favoriteRoute.put("/", auth(authRules.favorites.put), validator(favoriteSchemas.updateSchema), async(req, res, next) => {
    appLogger.info("Update favorite requested");
    try{
        const updatedFavorite = await favoriteService.update(req.body);
        res.send(updatedFavorite)
    } catch(error) {
        next(error);
    }
})

favoriteRoute.delete("/", auth(authRules.favorites.delete), validator(favoriteSchemas.deleteSchema), async(req, res, next) => {
    appLogger.info("Delete favorite requested");
    try{
        const deletedFavorite = await favoriteService.delete(req.body);
        res.send(deletedFavorite)
    } catch(error) {
        next(error);
    }
})

export default favoriteRoute;