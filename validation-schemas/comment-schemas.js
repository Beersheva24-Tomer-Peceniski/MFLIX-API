import Joi from "joi";

export const emailSchema = Joi.object({
    email: Joi.string().email().required()
})

export const addCommentSchema = Joi.object({
    email: Joi.string().email().required(),
    movieId: Joi.string().length(24).hex().required(),
    text: Joi.string().required(),
    name: Joi.string().required()
})

export const updateCommentSchema = Joi.object({
    commentId: Joi.string().length(24).hex().required(),
    email: Joi.string().email().required(),
    text: Joi.string().required()
})

export default {
    emailSchema,
    addCommentSchema,
    updateCommentSchema
}