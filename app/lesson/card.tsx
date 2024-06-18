import { cn } from "@/lib/utils"
import { challenges } from "@/db/schema"
import Image from "next/image"
import { useAudio, useKey } from "react-use"
import { useCallback } from "react"

type Props = {
    id: number
    imageSrc: string | null
    audioSrc: string | null
    text: string
    shortcut: string
    selected?: boolean
    // onClick still void. develop later
    onClick: () => void
    status?: "correct" | "wrong" | "none"
    disabled?: boolean
    type: typeof challenges.$inferSelect["type"]
}

export const Card = ({
    id,
    imageSrc,
    audioSrc,
    text,
    shortcut,
    selected,
    onClick,
    status,
    disabled,
    type
}: Props) => {
    // dont need state and ref
    // audio itself (literally the .mp3)
    // controls for play/pause (altho we just use play)
    const [audio, _, controls] = useAudio({ src: audioSrc || "" })

    // if clicked, play audio
    const handleClick = useCallback(() => {
        if (disabled) return

        controls.play()
        // develop onClick later
        onClick()
    }, [disabled, onClick, controls])

    useKey(shortcut, handleClick, {}, [handleClick])
    return (
        <div
            onClick={handleClick}
            className={cn(
                // all options
                "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
                // SELECT options classnames
                selected && "border-amber-100 bg-amber-50 hover:bg-amber-100",
                selected && status === "correct" && "border-yellow-400 bg-yellow-100 hover:bg-yellow-100",
                selected && status === "wrong" && "border-fuchsia-700 bg-fuchsia-100 hover:bg-fuchsia-100",
                disabled && "pointer-events-none hover:bg-white",
                // ASSIST options classnames
                type === "ASSIST" && "lg:p-3 text-lg w-full"
            )}
        >
            {audio}
            {imageSrc && (
                <div
                // define max width so they dont go widepeepoDank
                    className="relative aspect-square mb-4 max-w-[120px] max-h-[100px] lg:max-h-[150px] w-full"
                >
                    <Image 
                        src={imageSrc}
                        fill
                        alt={text}
                    />
                </div>
            )}
            <div className={cn(
                "flex items-center justify-between",
                // flex-row-reverse so the numbers are on the left
                type === "ASSIST" && "flex-row-reverse"
            )}>
                {type === "ASSIST" && <div />}
                {/* option */}
                <p className={cn(
                    "text-zinc-600 text-md lg:text-xl",
                    selected && "text-stone-800",
                    selected && status === "correct" && "text-yellow-400",
                    selected && status === "wrong" && "text-fuchsia-700",
                )}>
                    {text}
                </p>
                {/* number */}
                <div className={cn(
                    "w-[30px] h-[30px] border-2 flex items-center justify-center rounded-full text-zinc-500 text-sm font-medium",
                    selected && "border-amber-100 bg-amber-50 hover:bg-amber-100",
                    selected && status === "correct" && "border-yellow-400 bg-yellow-100 hover:bg-yellow-100",
                    selected && status === "wrong" && "border-fuchsia-700 bg-fuchsia-100 hover:bg-fuchsia-100",
                )}>
                    {shortcut}
                </div>
            </div>
        </div>
    )
}