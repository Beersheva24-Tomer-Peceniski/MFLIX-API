import Joi from "joi";

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

export const addAccountSchema = Joi.object({
    email: emailValidation,
    name: nameValidation,
    password: passwordValidation
})


export default {
    addAccountSchema
}