import Joi from "joi";
import { accountRole } from "../constants/constants.js";

const emailValidation = Joi.string().email();

const nameValidation = Joi.string()
    .min(3)
    .max(50)
    .custom((value, helpers) => {
        if (!value.includes(" ")) {
            return helpers.error('any.invalid', { message: 'Please insert at least one last name' });
        }
        return value;
    })

const passwordValidation = Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .message("Password must have at least 8 characters, one uppercase, one lowercase, one digit, and one special character");

const roleValidation = Joi.string()
    .valid(...Object.values(accountRole))
    .required()
    .messages({
        "any.only": "Role must be one of: USER, PREMIUM_USER, ADMIN",
    });

export const addAccountSchema = Joi.object({
    email: emailValidation.required(),
    name: nameValidation,
    password: passwordValidation.required()
})

export const updateRoleSchema = Joi.object({
    email: emailValidation.required(),
    role: roleValidation
})

export const updatePasswordSchema = Joi.object({
    email: emailValidation.required(),
    password: passwordValidation.required()
})

export const emailSchema = Joi.object({
    email: emailValidation.required()
})

export const loginSchema = Joi.object({
    email: emailValidation.required(),
    password: passwordValidation.required()
})


export default {
    addAccountSchema,
    updateRoleSchema,
    updatePasswordSchema,
    emailSchema,
    loginSchema
}