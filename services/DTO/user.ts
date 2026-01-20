import 'server-only'

import { getUser } from '../DAL/user'

export const getProfileDTO= async () => {
    const currentUser = await getUser()
    if (!currentUser) return null
    const {id, ...user} = currentUser
    return {username: user.name}
}