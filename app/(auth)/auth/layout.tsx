import Header from './_components/header'

const AuthLayout = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}

export default AuthLayout