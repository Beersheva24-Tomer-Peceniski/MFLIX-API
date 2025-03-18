import express from "express";
import appLogger from "../logger/appLogger.js";
import accountSchemas from "../validation-schemas/account-schemas.js";
import accountsService from "../services/accountsService.js";
import { validator } from "../middleware/validation.js";

const accountsRoute = express.Router();

accountsRoute.get("/:email", validator(accountSchemas.emailSchema, "params"), async (req, res) => {
    appLogger.info("Get account by email requested");
    const user = await accountsService.fyndByEmail(req.params.email);
    res.send(user);
})

accountsRoute.post("/user", validator(accountSchemas.addAccountSchema), async (req, res, next) => {
    appLogger.info("Add user requested")
    try {
        const addedUser = await accountsService.addUser(req.body)
        res.send(addedUser)
    } catch (error) {
        next(error)
    }
})

accountsRoute.post("/admin", validator(accountSchemas.addAccountSchema), async (req, res, next) => {
    appLogger.info("Add admin requested")
    try {
        const addedAdmin = await accountsService.addAdmin(req.body)
        res.send(addedAdmin)
    } catch (error) {
        next(error)
    }
})

accountsRoute.put("/role", validator(accountSchemas.updateRoleSchema), async (req, res, next) => {
    appLogger.info("Update role requested")
    try {
        const updatedAccount = await accountsService.updateRole(req.body)
        res.send(updatedAccount)
    } catch (error) {
        next(error)
    }
})

accountsRoute.put("/password", validator(accountSchemas.updatePasswordSchema), async (req, res, next) => {
    appLogger.info("Update password requested")
    try {
        const updatedAccount = await accountsService.updatePassword(req.body)
        res.send(updatedAccount)
    } catch (error) {
        next(error)
    }
})

accountsRoute.put("/block/:email", validator(accountSchemas.emailSchema, "params"), async (req, res, next) => {
    appLogger.info("Block Account requested")
    try {
        const response = await accountsService.blockAccount(req.params.email)
        res.send(response)
    } catch (error) {
        next(error)
    }
})

accountsRoute.put("/unblock/:email", validator(accountSchemas.emailSchema, "params"), async (req, res, next) => {
    appLogger.info("Unblock Account requested")
    try {
        const response = await accountsService.unblockAccount(req.params.email)
        res.send(response)
    } catch (error) {
        next(error)
    }
})

accountsRoute.delete("/:email", validator(accountSchemas.emailSchema, "params"), async (req, res, next) => {
    appLogger.info("Delete Account requested")
    try {
        const response = await accountsService.deleteAccount(req.params.email)
        res.send(response)
    } catch (error) {
        next(error)
    }
})

export default accountsRoute;