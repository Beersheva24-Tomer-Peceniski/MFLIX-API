import { createError } from "../errors/errors.js";
import commentService from "../services/commentsService.js";

const authRules = {
    movies: {
        get: {
            authentication: req => "jwt",
            authorization: req => req.role != "ADMIN"
        },
        post: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER"
        },
        put: {
            authentication: req => "jwt",
            authorization: req => true
        },
        delete: {
            authentication: req => "jwt",
            authorization: req => true
        }
    },
    comments: {
        get: {
            authentication: req => "jwt",
            authorization: req => !!req.role,
        },
        post: {
            authentication: req => "jwt",
            authorization: req => req.role !== "ADMIN"
        },
        put: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER" && req.user == req.body.email
        },
        delete: {
            authentication: req => "jwt",
            authorization: async req => {
                const comment = await commentService.getById(req.params.commentId);
                if (!comment) {
                    throw createError(400, "Comment not found");
                }
                return (req.role == "PREMIUM_USER" && req.user == comment.email) || req.role == "ADMIN";
            }
        }
    },
    favorites: {
        get: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER" && req.user == req.params.email
        },
        post: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER"
        },
        put: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER" && req.user == req.body.email
        },
        delete: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER" && req.user == req.body.email
        }
    },
    account: {
        get: {
            authentication: req => "jwt",
            authorization: req => req.role == "ADMIN" || req.user == req.params.email
        },
        post: {
            authentication: req => "basic",
            authorization: req => !!req.user && req.role == ""
        },
        putPassword: {
            authentication: req => "jwt",
            authorization: req => req.role == "ADMIN" || req.user == req.body.email
        },
        putRole: {
            authentication: req => "jwt",
            authorization: req => req.role == "ADMIN"
        },
        putBlockOrUnblock: {
            authentication: req => "jwt",
            authorization: req => req.role == "ADMIN"
        },
        delete: {
            authentication: req => "jwt",
            authorization: req => req.role == "ADMIN" || req.user == req.params.email
        }
    }
}

export default authRules;