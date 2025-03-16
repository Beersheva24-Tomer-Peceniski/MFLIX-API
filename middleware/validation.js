import { createError } from "../errors/errors.js";

export function validator(schema, location = "body") {
    return (req, res, next) => {
        const data = req[location];
        const {error} = schema.validate(data, { abortEarly: false });
        if(error) {
            throw createError(400, error.details.map(d => d.message).join(";"))
        }
        next();
    }
}