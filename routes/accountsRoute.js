import express from "express";
import appLogger from "../logger/appLogger.js";
import accountSchemas from "../validation-schemas/account-schemas.js";
import accountsService from "../services/accountsService.js";
import { validator } from "../middleware/validation.js";

const accountsRoute = express.Router();

accountsRoute.post("/add-user", validator(accountSchemas.addUserSchema), async (req, res, next) => {
    appLogger.info("Add user requested")
    try {
        const addedUser = await accountsService.addUser(req.body)
        res.send(addedUser)
    } catch (error) {
        next(error)
    }
})

export default accountsRoute;