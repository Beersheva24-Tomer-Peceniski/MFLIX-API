import express from "express";
import appLogger from "../logger/appLogger.js";
import accountSchemas from "../schemas/accountSchemas.js";
import accountService from "../services/accountService.js";
import { validator } from "../middlewares/validation.js";
import { auth } from "../middlewares/auth.js";
import authRules from "../security/authRules.js";


const accountRoute = express.Router();

accountRoute.get("/:email", auth(authRules.account.get), validator(accountSchemas.emailSchema, "params"), async (req, res) => {
    appLogger.info("Get account by email requested");
    const user = await accountService.fyndByEmail(req.params.email);
    res.send(user);
})

accountRoute.post("/user", validator(accountSchemas.addAccountSchema), async (req, res, next) => {
    appLogger.info("Add user requested")
    try {
        const addedUser = await accountService.addUser(req.body)
        res.send(addedUser)
    } catch (error) {
        next(error)
    }
})

accountRoute.post("/admin", auth(authRules.account.post), validator(accountSchemas.addAccountSchema), async (req, res, next) => {
    appLogger.info("Add admin requested");
    try {
        const addedAdmin = await accountService.addAdmin(req.body)
        res.send(addedAdmin)
    } catch (error) {
        next(error)
    }
})

accountRoute.post("/login", validator(accountSchemas.loginSchema), async (req, res, next) => {
    appLogger.info("Login requested");
    try {
        const token = await accountService.login(req.body)
        res.send(token)
    } catch (error) {
        next(error)
    }
})

accountRoute.put("/role", auth(authRules.account.putRole), validator(accountSchemas.updateRoleSchema), async (req, res, next) => {
    appLogger.info("Update role requested")
    try {
        const updatedAccount = await accountService.updateRole(req.body)
        res.send(updatedAccount)
    } catch (error) {
        next(error)
    }
})

accountRoute.put("/password", auth(authRules.account.putPassword), validator(accountSchemas.updatePasswordSchema), async (req, res, next) => {
    appLogger.info("Update password requested")
    try {
        const updatedAccount = await accountService.updatePassword(req.body)
        res.send(updatedAccount)
    } catch (error) {
        next(error)
    }
})

accountRoute.put("/block/:email", auth(authRules.account.putBlockOrUnblock), validator(accountSchemas.emailSchema, "params"), async (req, res, next) => {
    appLogger.info("Block Account requested")
    try {
        const response = await accountService.block(req.params.email)
        res.send(response)
    } catch (error) {
        next(error)
    }
})

accountRoute.put("/unblock/:email", auth(authRules.account.putBlockOrUnblock), validator(accountSchemas.emailSchema, "params"), async (req, res, next) => {
    appLogger.info("Unblock Account requested")
    try {
        const response = await accountService.unblock(req.params.email)
        res.send(response)
    } catch (error) {
        next(error)
    }
})

accountRoute.delete("/:email", auth(authRules.account.delete), validator(accountSchemas.emailSchema, "params"), async (req, res, next) => {
    appLogger.info("Delete Account requested")
    try {
        const response = await accountService.delete(req.params.email)
        res.send(response)
    } catch (error) {
        next(error)
    }
})

export default accountRoute;