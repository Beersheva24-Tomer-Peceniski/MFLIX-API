import Joi from "joi";
import { accountRole } from "../constants/constants.js";

const emailValidation = Joi.string().email().required();

const nameValidation = Joi.string()
    .min(3)
    .max(50)
    .custom((value, helpers) => {
        if (!value.includes(" ")) {
            return helpers.error("any.invalid", "Please insert at least one last name");
        }
        return value;
    })

const passwordValidation = Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .message("Password must have at least 8 characters, one uppercase, one lowercase, one digit, and one special character")
    .required()

const roleValidation = Joi.string()
    .valid(...Object.values(accountRole))
    .required()
    .messages({
        "any.only": "Role must be one of: USER, PREMIUM_USER, ADMIN",
    });

export const addAccountSchema = Joi.object({
    email: emailValidation,
    name: nameValidation,
    password: passwordValidation
})

export const updateRoleSchema = Joi.object({
    email: emailValidation,
    role: roleValidation
})

export const updatePasswordSchema = Joi.object({
    email: emailValidation,
    password: passwordValidation
})

export const getByEmailSchema = Joi.object({
    email: emailValidation
})


export default {
    addAccountSchema,
    updateRoleSchema,
    updatePasswordSchema,
    getByEmailSchema
}