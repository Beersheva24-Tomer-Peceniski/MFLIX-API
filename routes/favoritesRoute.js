import express from "express";
import appLogger from "../logger/appLogger.js";
import favoriteSchemas from "../validation-schemas/favorite-schemas.js";
import favoritesService from "../services/favoritesService.js";
import { validator } from "../middleware/validation.js";
import { auth } from "../middleware/auth.js";
import authRules from "../security/authRules.js";

const favoritesRoute = express.Router();

favoritesRoute.get("/:email", auth(authRules.favorites.get), validator(favoriteSchemas.getByEmailSchema, "params"), async (req, res, next) => {
    appLogger.info("Get favorites by Email requested");
    try {
        const favorites = await favoritesService.getByEmail(req.params.email);
        res.send(favorites);
    } catch (error) {
        next(error);
    }
})

favoritesRoute.post("/", auth(authRules.favorites.post), validator(favoriteSchemas.addSchema), async (req, res, next) => {
    appLogger.info("Add favorite requested")
    try {
        const addedFavorite = await favoritesService.add(req.body);
        res.status(201).send(addedFavorite);
    } catch (error) {
        next(error)
    }
})

favoritesRoute.put("/", auth(authRules.favorites.put), validator(favoriteSchemas.updateSchema), async(req, res, next) => {
    appLogger.info("Update favorite requested");
    try{
        const updatedFavorite = await favoritesService.update(req.body);
        res.send(updatedFavorite)
    } catch(error) {
        next(error);
    }
})

favoritesRoute.delete("/", auth(authRules.favorites.delete), validator(favoriteSchemas.deleteSchema), async(req, res, next) => {
    appLogger.info("Delete favorite requested");
    try{
        const deletedFavorite = await favoritesService.delete(req.body);
        res.send(deletedFavorite)
    } catch(error) {
        next(error);
    }
})

export default favoritesRoute;