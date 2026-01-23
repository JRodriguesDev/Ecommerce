import 'server-only'

import { getProfile } from '../DAL/user'

export const getProfileDTO= async () => {
    const currentUser = await getProfile()
    if (!currentUser) return null
    const {id, ...user} = currentUser
    return {username: user.name}
}