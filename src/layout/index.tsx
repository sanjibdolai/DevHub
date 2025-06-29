import { Outlet } from "react-router"
import Header from "./header"
import Footer from "./footer"

function Layout() {
    return (
        <div className="h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans flex flex-col">
            <Header />
            <main className="grow container mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout