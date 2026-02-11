import {getPerfil} from '@/services/DAL/user'

export const getPerfilInfo = async (userId: string) => {
    const data = await getPerfil(userId)
    return data
}