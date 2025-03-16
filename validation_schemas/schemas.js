import Joi from "joi";

export const movieIdSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})