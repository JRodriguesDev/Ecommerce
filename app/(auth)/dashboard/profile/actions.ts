import {getPerfil} from '@/services/DAL/user'

export const getPerfilInfoAction = async (userId: string) => {
    const data = await getPerfil(userId)
    return data
}