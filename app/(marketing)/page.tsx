import { Button } from "@/components/ui/button"
import { ClerkLoaded, ClerkLoading, SignUpButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { Loader } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">

      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/marketingBebe.png" fill alt="marketingBebe" />
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Melajah, Latian lan ngeduegang ring basa Bali nganggen Balingo
        </h1>


        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>

          <ClerkLoaded>
            <SignedOut>
              <SignUpButton 
                mode="modal"
                forceRedirectUrl="NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL"
                signInForceRedirectUrl="NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL">
                <Button size="lg" variant="secondary" className="w-full">
                  Ngeranjing
                </Button>
              </SignUpButton>
              <SignInButton 
                mode="modal"
                forceRedirectUrl="NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL"
                signUpForceRedirectUrl="NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL">
                <Button size="lg" variant="primaryOutline" className="w-full">
                  Rage sube ngelah akun
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">
                  Lantur Melajah
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>


      </div>
    </div>
  )
}