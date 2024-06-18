import { challengeOptions, challenges } from "@/db/schema"
import { cn } from "@/lib/utils"
import { Card } from "./card"

type Props = {
    options: typeof challengeOptions.$inferSelect[]
    onSelect: (id:number) => void
    status: "correct" | "wrong" | "none"
    selectedOption?: number
    disabled?: boolean
    type: typeof challenges.$inferSelect["type"]
}




export const Challenge = ({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
    type
}: Props) => {
    return (
        // just do grid gap-3 if ASSIST
        // if SELECT, make the all the options in a row but for lg make it fancy
        <div className={cn(
            "grid gap-3",
            type === "ASSIST" && "grid-cols-3 lg:grid-cols-1",
            type === "SELECT" && " grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
        )}>
            {/* if options.length > 0 loop the thing */}
            {options.length > 0 && options.map((option, i) => (
                <Card 
                    key={option.id}
                    id={option.id}
                    text={option.text}
                    imageSrc={option.imageSrc}
                    // shortcut so user can use their number button to choose
                    shortcut={`${i + 1}`}
                    selected={selectedOption === option.id}
                    onClick={() => onSelect(option.id)}
                    status={status}
                    audioSrc={option.audioSrc}
                    disabled={disabled}
                    type={type}
                />
            ))}
        </div>
    )
}