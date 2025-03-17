import Joi from "joi";

const currentYear = new Date().getFullYear();

export const emailSchema = Joi.object({
    email: Joi.string().email().required()
})

export default {
    emailSchema
}