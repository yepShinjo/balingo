import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = () => {
    return (
        <footer className="h-16">
            <div className="flex items-center justify-evenly">
                <Button size="lg" variant="ghost" className="w-full">
                    <Image 
                        src="/sor.svg" 
                        alt="sor" 
                        height={54} 
                        width={54} 
                        className="mr-5"/>
                    Sor
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image 
                        src="/mider.svg" 
                        alt="mider" 
                        height={54} 
                        width={54} 
                        className="mr-5"/>
                    Mider
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image 
                        src="/singgih.svg" 
                        alt="singgih" 
                        height={54} 
                        width={54} 
                        className="mr-5"/>
                    Singgih
                </Button>
            </div>
        </footer>
    )
}