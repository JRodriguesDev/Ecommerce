import Link from 'next/link'

const Header = () => {
    return (
        <header className='bg-blue-900 w-full h-24 flex items-center'>
            <Link
                className='cursor-pointer text-black text-2xl font-semibold hover:scale-105 duration-75 ml-25' 
                href='/shop'
                >Ecommerce
            </Link>
        </header>
    )
}

export default Header