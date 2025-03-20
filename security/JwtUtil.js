import jwt from 'jsonwebtoken'

export default class JwtUtil {
    static verifyJwt(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}