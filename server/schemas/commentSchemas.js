import Joi from "joi";

const emailValidation = Joi.string().email();

const idValidation = Joi.string().length(24).hex();

const stringValidation = Joi.string();

export const emailSchema = Joi.object({
    email: emailValidation.required()
})

export const addCommentSchema = Joi.object({
    email: emailValidation.required(),
    movieId: idValidation.required(),
    text: stringValidation.required(),
    name: stringValidation.required(),
})

export const updateCommentSchema = Joi.object({
    commentId: idValidation.required(),
    email: emailValidation.required(),
    text: stringValidation.required()
})

export const commentIdSchema = Joi.object({
    commentId: idValidation.required()
})

export default {
    emailSchema,
    addCommentSchema,
    updateCommentSchema,
    commentIdSchema
}