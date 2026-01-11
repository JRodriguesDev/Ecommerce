import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

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