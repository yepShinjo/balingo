import React from 'react';
import { useKey, useMedia } from "react-use";
import { XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";


type Props = {
    onCheck: () => void;
    status: "correct" | "wrong" | "none" | "completed";
    disabled?: boolean;
    lessonId?: string;
};

export const Footer: React.FC<Props> = ({
    onCheck,
    status,
    disabled,
    lessonId
}) => {
    useKey("Enter", onCheck, {}, [onCheck]);
    const isMobile = useMedia("(max-width: 1024px)");

    return (
        <footer className={cn(
            "lg:h-[140px] h-[100px]",
            status === "correct" && "border-transparent bg-orange-100",
            status === "wrong" && "border-transparent bg-fuchsia-100",
        )}>
            <div className="max-w-[1040px] h-full mx-auto flex items-center justify-between px-6 lg:px-10 relative">
                {status === "correct" && (
                    <div className=" text-green-500 font-bold text-base lg:text-2xl flex items-center">
                        <Image 
                            src="/pura.png"
                            alt="pura"
                            width={70}
                            height={70}
                            className="animate-custom-bounce"
                        />
                        <p className="text-xl pl-4 pt-2">
                            Mantep Wii !
                        </p>
                    </div>
                )}
                {status === "wrong" && (
                    <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
                        <XCircle className="h-10 w-10 mr-4" />
                        Seng engken, Cobak Biin.
                    </div>
                )}
                {status === "completed" && (
                    <Button
                        variant="default"
                        size={isMobile ? "sm" : "lg"}
                        onClick={() => window.location.href = `/lesson/${lessonId}`}
                    >
                        Latian Biin Wii
                    </Button>
                )}
                <Button
                    disabled={disabled}
                    className="ml-auto mb-2"
                    onClick={onCheck}
                    size={isMobile ? "sm" : "lg"}
                    variant={status === "wrong" ? "danger" : "secondary"}
                >
                    {status === "none" && "Cek"}
                    {status === "correct" && "Lanjut"}
                    {status === "wrong" && "Ulang"}
                    {status === "completed" && "Lanturang"}
                </Button>
            </div>
        </footer>
    );
};
