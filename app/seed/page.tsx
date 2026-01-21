'use client'

import { useState } from "react"
import {seedProductsAction} from './actions'

const Seed = () => {
    const [loading, setLoading] = useState(false)

    const syncProduct = async () => {
        setLoading(true)
        const [resFake, resDummy, resPlatzi] = await Promise.all([
        fetch('https://fakestoreapi.com/products'),
        fetch('https://dummyjson.com/products?limit=194'),
        fetch('https://api.escuelajs.co/api/v1/products')
    ])
    const [fakeData, dummyData, platziData] = await Promise.all([
        resFake.json(),
        resDummy.json(),
        resPlatzi.json()
    ])
    const allData = { fakeStore: fakeData, jsonDummy: dummyData, platzi: platziData }
    console.log(allData)
    await seedProductsAction(allData)
    setLoading(false)
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <button disabled={loading} onClick={syncProduct} className=" p-1.5 bg-black text-md text-white rounded-md font-semibold cursor-pointer">
                {loading ? 'Sincronizando' : 'Sync Products'}
            </button>
        </div>
    )
}

export default Seed