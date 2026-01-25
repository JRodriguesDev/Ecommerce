import Header from "@/app/(shop)/shop/_components/header"
import Footer from "@/app/(shop)/shop/_components/footer"

const ShopLayout = ({
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

export default ShopLayout