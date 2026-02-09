import { NextAuthConfig } from "next-auth";
import {updateImage} from '@/services/DAL/auth'

export const myEvents: NextAuthConfig['events'] = {
    async linkAccount({user, profile, account}) {
            switch (account.provider) {
                case 'google':
                    const googleUrl = profile.picture || profile.image
                    if (googleUrl) await updateImage(user.id!, {googleImage: googleUrl})
                    break
                case 'discord':
                    const discordAvatar = profile.avatar 
                        ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
                        : `https://cdn.discordapp.com/embed/avatars/${Number(profile.discriminator) % 5}.png`;
                    const discordUrl = discordAvatar
                    if (discordUrl) await updateImage(user.id!, {discordImage: discordUrl})
            }
        }
} 