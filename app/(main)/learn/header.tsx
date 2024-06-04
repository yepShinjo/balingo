import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
}

// export default const... (we have more than one const inside the file (usage : exporting multiple const))
// export const... (we only have one const inside the file)
export const Header = ({ title }: Props) => {
    return (
        // lg:z-50 why?
        // cuz on large we gon have some other floating elements that CAN overlap with header

        // 2 actual components inside the div (Link, h1). Added an extra self closing div because the arrowLeft icon is so small and the text is also small
        // justify-between align all element and equally space them out
        // so, to trick that, add an empty div 

        // to keep the header sticky at the top align with the user-progress, we do this trick
        // lg:pt-[28px] and lg:mt-[-28px] to make the header sticky at the top
        <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
            <Link href="/courses">
                <Button variant="ghost" size="sm"> 
                    <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400"/> 
                </Button>
            </Link>
            <h1 className="font-bold text-lg">
                {title}
            </h1>
            <div />
        </div>
    )
}