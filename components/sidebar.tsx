// help merge tailwind with shadcn
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./ui/sidebar-item";
import {
    ClerkLoading,
    ClerkLoaded,
    UserButton,
    SignedIn,
} from "@clerk/nextjs"
import { Loader } from "lucide-react"
import '../global.css'
import { RightSidebar } from "./right-sidebar";

type Props = {
    className?: string;
}

export const Sidebar= ({ className }: Props) => {
    return (
        <div className={cn("flex h-full pl-6 lg:fixed left-0 top-0 px-4 flex-col justify-center",
        className,
        )}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/mascot.svg" height={80} width={80} alt="Mascot"/>
                    <h1 className="text-3xl font-extrabold text-green-600/100 tracking-wider">
                        Balingo
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col flex-1">
                <SidebarItem label="Melajah" href="/learn" iconSrc="/orangbali1.png" />
                <SidebarItem label="Rangking" href="/leaderboard" iconSrc="/leaderboard.svg" />
                <SidebarItem label="Tugas" href="/quests" iconSrc="/puralempuyang.png" />
                <SidebarItem label="Meblanja" href="/shop" iconSrc="/barong.png" />
            </div>
            <div className="flex-1">
                <Image 
                    src="/bali.png"
                    alt="bali"
                    width={150}
                    height={150}
                    className="pt-[100px]"
                />
            </div>
            <div className="pl-4 pb-6">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </ClerkLoaded>
            </div>
            <RightSidebar />
        </div>
    )
}