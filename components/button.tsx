import {Spinner} from './animations'

export const FormButton = (
        {
            isLoading,
            name
        }: {
            isLoading?: boolean,
            name: string
        }
    ) => {
        return (
            <button
                className="
                    flex flex-row items-center justify-center
                    cursor-pointer min-w-25 min-h-9 gap-2 p-1 rounded-lg bg-black font-medium text-white
                    duration-200 transition-all
                    hover:scale-105
                    active:scale-90
                    disabled:bg-gray-600 disabled:scale-100 disabled:cursor-not-allowed 
                "
                disabled={isLoading}
                type='submit'
            >
            {isLoading ? (
                <>
                <Spinner/>
                <span>Loading...</span>
                </>
            ):(
                name
            )}
            </button>
        )
}