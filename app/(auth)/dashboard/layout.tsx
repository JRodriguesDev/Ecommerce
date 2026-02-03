import Header from './_components/header'
import SideBar from './_components/sideBar'

const DashboardLayout = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    return (
        <>
            <Header/>
            <SideBar/>
            {children}
        </>
    )
}

export default DashboardLayout