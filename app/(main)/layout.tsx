import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/ui/mobile-header";

type Props = {
    children: React.ReactNode;
}

const MainLayout = ({ 
    children,
}: Props) => {
    return (
        <>
            <MobileHeader />
            {/* make the classname visible on desktop but hidden on mobile */}
            <Sidebar className="hidden lg:flex" />
            {/* add left padding on large screen for the sidebar */}
            <main className="lg:pl-[256px] h-full p-8">
                <div className="max-w-[1056px] mx-auto pl-6 pt-6 h-full">
                    {children}
                </div>
            </main>
        </>
    )
}

export default MainLayout