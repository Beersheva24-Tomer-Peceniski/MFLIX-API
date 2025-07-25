import Joi from "joi";

const currentYear = new Date().getFullYear();

export const movieIdSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})

export const filterMoviesSchema = Joi.object({
    year: Joi.number().integer().min(0).max(currentYear).optional(),
    actor: Joi.alternatives().try(Joi.string(), Joi.object().instance(RegExp)).optional(),
    genres: Joi.array().items(Joi.string()).optional(),
    languages: Joi.array().items(Joi.string()).optional(),
    amount: Joi.number().integer().optional()
})

export const ratingMovieSchema = Joi.object({
    id: Joi.number().integer().required(),
    rating: Joi.number().min(1).max(10).required()
})

export default {
    movieIdSchema,
    filterMoviesSchema,
    ratingMovieSchema
}