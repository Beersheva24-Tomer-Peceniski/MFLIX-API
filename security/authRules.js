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
    }
}

export default authRules;