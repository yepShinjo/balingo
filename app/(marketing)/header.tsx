import { 
    ClerkLoading, 
    ClerkLoaded, 
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs"
import Image from "next/image"
import { Loader } from "lucide-react"
import { Button } from "@/components/ui/button"

export const Header = () => {
    return (
        <header className="h-20 2-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl--4 pb-7 flex items-center gap-x-3">
                    <Image src="/mascot.svg" height={40} width={40} alt="Mascot"/>
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                        Balingo
                    </h1>
                </div>

                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>

                <ClerkLoaded>

                    <SignedIn>
                        <UserButton afterSignOutUrl="/"/>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton 
                            mode="modal" 
                            forceRedirectUrl="NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL"
                            signUpForceRedirectUrl="NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL">
                            
                        <Button size="lg" variant="ghost">Login</Button>
                        </SignInButton>
                    </SignedOut>

                </ClerkLoaded>
            </div>
        </header>
    )
}