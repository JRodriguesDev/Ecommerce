import {allCategories} from '../actions'

export const CategoriesSkeleton = () => {

    return (
        <div className="w-full min-h-30 bg-white flex flex-row flex-wrap animate-pulse gap-1 justify-center rounded-md">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="w-12 h-5 bg-gray-300 rounded"></div>
            ))}
        </div>
    )
}

export const Categories = async () => {
    const categories = await allCategories()

    return (
        <div className="w-full min-h-30 bg-white flex flex-row flex-wrap animate-pulse gap-1 justify-center rounded-md">
            {categories.map((el) => (
                <span key={el.id} className="p-2 text-blue-800">{el.name}</span>
            ))}
        </div>
    )
}