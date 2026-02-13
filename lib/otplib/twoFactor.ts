import { generateSecret, generate, verify, } from 'otplib' 


export const generateToken = async () => {
    const secret = generateSecret()
    const token = await generate({secret})
    return {token: token, secret: secret}
}

export const verifyToken = async (secret:string, token: string) => {
    const validated = await verify({secret, token})
    return validated.valid
}

