import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost" className="w-full">
                    <Image 
                        src="/sor.svg" 
                        alt="sor" 
                        height={32} 
                        width={40} 
                        className="mr-4 rounded-md"/>
                    Sor
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image 
                        src="/mider.svg" 
                        alt="mider" 
                        height={32} 
                        width={40} 
                        className="mr-4 rounded-md"/>
                    Mider
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image 
                        src="/singgih.svg" 
                        alt="singgih" 
                        height={32} 
                        width={40} 
                        className="mr-4 rounded-md"/>
                    Singgih
                </Button>
            </div>
        </footer>
    )
}