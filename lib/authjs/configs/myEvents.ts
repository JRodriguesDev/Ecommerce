import { NextAuthConfig } from "next-auth";
import {updateImage} from '@/services/DAL/user'
import {userCartCreateDB, userTwoFactorCreateDB} from '@/services/DAL/auth'

export const myEvents: NextAuthConfig['events'] = {
    async createUser({user}) {
        await userTwoFactorCreateDB(user.id!)
        await userCartCreateDB(user.id!)
    },
    async linkAccount({user, profile, account}) {
            switch (account.provider) {
                case 'google':
                    const googleUrl = profile.picture || profile.image
                    if (googleUrl) await updateImage(user.id!, {googleImage: googleUrl})
                    break
                case 'discord':
                    const discordUrl = profile.picture || profile.image
                    if (discordUrl) await updateImage(user.id!, {discordImage: discordUrl})
            }
        }
} 