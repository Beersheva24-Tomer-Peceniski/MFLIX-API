import { createError } from "../errors/errors.js";

export function formatJoiErrors(error) {
    const errorObject = {};
    error.details.forEach(detail => {
        const field = detail.path.join('.');
        let message = detail.message;
        
        // Handle custom validation errors
        if (detail.type === 'any.invalid' && detail.context && detail.context.message) {
            message = detail.context.message;
        } else {
            // Remove the field name prefix from standard Joi messages
            // e.g., '"email" must be a valid email' -> 'must be a valid email'
            message = message.replace(/^"[^"]*"\s*/, '');
        }
        
        // If field already has an error, keep the first one to avoid duplicates
        if (!errorObject[field]) {
            errorObject[field] = message;
        }
    });
    return errorObject;
}

export function validator(schema, location = "body") {
    return (req, res, next) => {
        const data = req[location];
        const {error} = schema.validate(data, { abortEarly: false });
        if(error) {
            const errorObject = formatJoiErrors(error);
            throw createError(400, errorObject);
        }
        next();
    }
}