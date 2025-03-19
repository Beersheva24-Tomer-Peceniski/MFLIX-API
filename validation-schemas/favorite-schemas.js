import Joi from "joi";

const emailValidation = Joi.string().email();

const idValidation = Joi.string().length(24).hex();

const feedbackValidation = Joi.string();

const viewdValidation = Joi.boolean();

export const addSchema = Joi.object({
    email: emailValidation.required(),
    movieId: idValidation.required(),
    feedback: feedbackValidation,
    viewed: viewdValidation
})

export const getByEmailSchema = Joi.object({
    email: emailValidation.required()
})

export const updateSchema = Joi.object({
    id: idValidation.required(),
    email: emailValidation.required(),
    feedback: feedbackValidation,
    viewed: viewdValidation
})

export default {
    addSchema,
    getByEmailSchema,
    updateSchema
}