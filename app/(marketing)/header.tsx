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
        <header>
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-center h-full gap-x-20">
                <div className="pt-6 pb-6 flex items-center justify-center ">
                    <Image src="/mascot.svg" height={80} width={80} alt="Mascot"/>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-wide">
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
                            
                        <Button
                            className="text-1xl pt-1"
                            size="lg" 
                            variant="super">Login</Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    )
}