import {SignJWT, jwtVerify, type JWTPayload} from 'jose'

const secret = process.env.JWT_SECRET
if (!secret) throw new Error('JWT_SECRET is not defined')
const encoderSecret = new TextEncoder().encode(secret) 

export const generateToken = async (payload: JWTPayload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .sign(encoderSecret)
}

export const verifyToken = async (token: string) => {
    return await jwtVerify(token, encoderSecret)
}