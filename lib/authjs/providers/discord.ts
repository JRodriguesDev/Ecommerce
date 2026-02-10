import Discord from 'next-auth/providers/discord'

const discord = Discord({
    clientId: process.env.AUTH_DISCORD_ID,
    clientSecret: process.env.AUTH_DISCORD_SECRET,
    allowDangerousEmailAccountLinking: true,
    profile(profile) {
        const discordAvatar = profile.avatar 
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            : `https://cdn.discordapp.com/embed/avatars/${Number(profile.discriminator) % 5}.png`;
        return {
            email: profile.email,
            image: discordAvatar,
            
            mainImage: discordAvatar,
            discordImage: discordAvatar,
        }
    }
})

export default discord