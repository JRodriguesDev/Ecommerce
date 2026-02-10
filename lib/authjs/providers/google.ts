import Google from 'next-auth/providers/google'

const google = Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    allowDangerousEmailAccountLinking: true,
    profile (profile) {
        return {
            email: profile.email,
            image: profile.picture,

            mainImage: profile.picture,
            googleImage: profile.picture
        }
    }
})

export default google