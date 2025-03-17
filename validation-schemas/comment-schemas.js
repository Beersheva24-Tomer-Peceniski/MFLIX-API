import Joi from "joi";

const currentYear = new Date().getFullYear();

export const emailSchema = Joi.object({
    email: Joi.string().email().required()
})

export const addCommentSchema = Joi.object({
    email: Joi.string().email().required(),
    movieId: Joi.string().length(24).hex().required(),
    text: Joi.string().required(),
    name: Joi.string().required()
})

export default {
    emailSchema,
    addCommentSchema
}