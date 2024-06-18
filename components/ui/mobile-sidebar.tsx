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
            {/* p-0 to get rid of that straight line */}
            <SheetContent className="p-0 z-[100]" side="left">
                {/* we uses cn inside this component. means we have "default" class that we define inside the sidebar component. if we want to add more class property, we can also do that inside this file */}
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}