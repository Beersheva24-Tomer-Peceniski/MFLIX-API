import { createError } from "../errors/errors.js";
import JwtUtil from "../security/JwtUtil.js";
import accountsService from "../services/accountsService.js";

const BEARER = "Bearer ";
const BASIC = "Basic ";

export function authenticate() {
    return async (req, res, next) => {
        const authHeader = req.header("Authorization");
        if (authHeader.startsWith(BEARER)) {
            jwtAuthentication(req, authHeader);
        } else if (authHeader.startsWith(BASIC)) {
            await basicAuthentication(req, authHeader);
        }
        next();
    }
}

function jwtAuthentication(req, authHeader) {
    const token = authHeader.substring(BEARER.length);
    try {
        const payload = JwtUtil.verifyJwt(token);
        req.user = payload.sub;
        req.role = payload.role;
        req.authType = "jwt"
    } catch (error) {

    }
}

async function basicAuthentication(req, authHeader) {
    const userNamePassword64 = authHeader.substring(BASIC.length);
    const userNamePassword = Buffer.from(userNamePassword64, "base64").toString("utf-8");
    const { username, password } = userNamePassword.split(":");
    try {
        if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD) {
            req.user = username;
            req.role = "";
            req.authType = "basic"
        }
        else {
            await accountsService.checkLogin(username, password);
            req.user = username;
            req.role = await accountsService.fyndByEmail(username).role;
            req.authType = "basic"
        }
    } catch (error) {

    }
}

export function auth(rules) {
    return (req, res, next) => {
        const { authentication, authorization } = rules[req.method];
        if (!authorization) {
            throw createError(500, "Security configuration not provided");
        }
        if (authentication(req)) {
            if (req.authType != authentication(req)) {
                throw createError(401, "No required configuration");
            }
            if (!authorization(req)) {
                throw createError(403, "");
            }
        }
        next();
    }
}