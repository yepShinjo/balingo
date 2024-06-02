// Every page component inside the 'pages' directory in Next.js is a server component by default, meaning it is rendered on the server side.
// The 'use client' directive (although not a standard directive) represents the boundary between client-side and server-side rendering in Next.js.
// Components outside the 'pages' directory are typically client components unless explicitly used as server components.
// In client components, we can use React hooks such as useEffect, useState, useContext, etc., to manage component state and side effects.

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// create props for the sidebar-item
type Props = {
    label: string
    iconSrc: string
    href: string
}

// destructure them using : Props. after that do the following function...
export const SidebarItem = ({label, iconSrc, href,}: Props) => {
    const pathname = usePathname() // hook to get the current pathname of the URL
    const active = pathname === href // make sure pathname and href are the same. if yes, make it active
    return (
        <>
            <Button
                variant={active ? "sidebarOutline" : "sidebar"}
                className="justify-start h-[52px]"
                asChild
            >
                <Link href={href}>
                    <Image
                        src={iconSrc}
                        alt={label}
                        className="mr-5"
                        height={32}
                        width={32}
                    />
                    {label}
                </Link>
            </Button>
        </>
    )
}