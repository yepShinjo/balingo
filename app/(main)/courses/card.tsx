import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
    title: string;
    id: number;
    imageSrc: string;
    onClick: (id: number) => void;
    disable: boolean;
    active: boolean;
}


export const Card = ({title, id, imageSrc, onClick, disable, active}: Props) => {
    return (
        <div
            onClick={() => onClick(id)}
            className={cn(
                " bg-emerald-100 border-2 rounded-xl border-b-4 border-r-4 hover:bg-emerald-50 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 ", 
                disable && "opacity-30 pointer-events-none "
            )}
        >
            <div className="min-[24px] w-full flex items-center justify-end">
                {/* if class is active */}
                {active && (
                    <div className="rounded-md bg-blue-300 flex items-center justify-center p-1.5">
                        <Check className="text-white stroke-[3]"/>
                    </div>
                )}
                
            </div>
            <Image 
                src={imageSrc}
                alt={title}
                height={80}
                width={80}
                className="rounded-lg"
            />
            <p className="text-zinc-700 text-center font-bold m-4 text-lg">
                {title}
            </p>
        </div>
    )
}