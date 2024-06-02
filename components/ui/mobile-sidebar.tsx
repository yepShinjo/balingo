// sheet are for creating sliding panel or drawer component
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"

import { Sidebar } from "@/components/sidebar"
import { Menu } from "lucide-react"

export const MobileSidebar = () => {
    return (
        <Sheet>
            {/* click the menu icon */}
            <SheetTrigger>
                <Menu className="text-white" />
            </SheetTrigger>
            {/* boom sidebar appear */}
            <SheetContent className="p-0 z-[100]" side="left">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}