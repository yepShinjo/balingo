// mobile header will contain mobile sidebar (which contain the menu icon)
import { MobileSidebar } from "./mobile-sidebar"

export const MobileHeader = () => {
    return (
        <nav className="lg:hidden pl-6 h-[50px] flex bg-orange-300 fixed w-full z-50">
            <MobileSidebar />
        </nav>
    )
}