'use server'

import {verifySession} from '@/services/DAL/user'
import {cleanedDTO} from '@/services/DTO/seed'
import {fakeStore, jsonDummy, platzi} from '@/types/fakeStores'
import {syncSeedWithDatabase} from '@/services/DAL/seed'

export const seedProductsAction = async (data: {fakeStore: fakeStore[], jsonDummy: jsonDummy, platzi: platzi[]}) => {
    await verifySession()
    const cleanedData = cleanedDTO(data)
    const completedSync = await syncSeedWithDatabase(cleanedData)
    console.log(completedSync)
}
