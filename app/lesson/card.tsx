import { challenges } from "@/db/schema"

type Props = {
    id: number
    imageSrc: string | null
    audioSrc: string | null
    text: string
    shortcut: string
    selected?: boolean
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
    return (
        <div>
            {text}
        </div>
    )
}