import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            {/* navbar */}
            <Outlet/>
            {/* footer */}
        </>
    )
}

export default Layout