import { createError } from "../errors/errors.js";
import commentsService from "../services/commentsService.js";

const authRules = {
    MOVIES: {
        GET: {
            authentication: req => "jwt",
            authorization: req => req.role != "ADMIN"
        },
        POST: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER"
        },
        PUT: {
            authentication: req => "jwt",
            authorization: req => true
        },
        DELETE: {
            authentication: req => "jwt",
            authorization: req => true
        }
    },
    COMMENTS: {
        GET: {
            authentication: req => "jwt",
            authorization: req => !!req.role,
        },
        POST: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER"
        },
        PUT: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER" && req.user == req.body.email
        },
        DELETE: {
            authentication: req => "jwt",
            authorization: async req => {
                const comment = await commentsService.getById(req.params.commentId);
                if (!comment) {
                    throw createError(400, "Comment not found");
                }
                return (req.role == "PREMIUM_USER" && req.user == comment.email) || req.role == "ADMIN";
            }
        }
    },
    FAVORITES: {
        GET: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER" && req.user == req.params.email
        },
        POST: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER"
        },
        PUT: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER" && req.user == req.body.email
        },
        DELETE: {
            authentication: req => "jwt",
            authorization: req => req.role == "PREMIUM_USER" && req.user == req.body.email
        }
    },
    ACCOUNT: {
        GET: {
            authentication: req => "jwt",
            authorization: req => req.role == "ADMIN" || req.user == req.params.email
        },
        POST: {
            authentication: req => "basic",
            authorization: req => !!req.user && req.role == ""
        },
        PUTPASSWORD: {
            authentication: req => "jwt",
            authorization: req => req.role == "ADMIN" || req.user == req.params.email
        },
        PUTROLE: {
            authentication: req => "jwt",
            authorization: req => req.role == "ADMIN"
        },
        PUTBLOCKUNBLOCK: {
            authentication: req => "jwt",
            authorization: req => req.role == "ADMIN"
        },
        DELETE: {
            authentication: req => "jwt",
            authorization: req => req.role == "ADMIN" || req.user == req.params.email
        }
    }
}

export default authRules;