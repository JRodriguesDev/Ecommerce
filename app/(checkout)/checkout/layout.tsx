import {Header} from './_components/header'
import {Footer} from './_components/footer'

const CheckoutLayout = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}

export default CheckoutLayout