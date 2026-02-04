import {getProfile} from '@/services/DAL/user'
 
export const profile =  async () => {
    const data = await getProfile()
    return data
}