import jwt from 'jsonwebtoken'

export default class JwtUtil {
    static verifyJwt(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }

    static getJwt(account) {
        return jwt.sign(
            {
                role: account.role,
                sub: account.email
            },
            process.env.JWT_SECRET
        )
    }
}