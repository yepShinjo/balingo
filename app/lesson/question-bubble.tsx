import Image from "next/image"

type Props = {
    question: string
}

export const QuestionBubble = ({ question }: Props) => {
    return (
        <div className="flex items-center gap-x-4 mb-6">
            {/* mascot for large screen */}
            <Image 
                src="/mascot.svg"
                alt="mascot"
                width={180}
                height={180}
                className="hidden lg:block"
            />

            {/* mascot for medium and small screen */}
            <Image 
                src="/mascot.svg"
                alt="mascot"
                width={120}
                height={120}
                className="block lg:hidden"
            />
            <div className="relative lg:p-4 p-2 border-2 rounded-xl lg:text-2xl text-lg ">
                {question}
                <div 
                    className="absolute -left-3 top-1/2 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-transparent border-r-8 border-r-gray-300 border-b-8 border-b-transparent transform -translate-y-1/2 rotate-180"
                />
            </div>
        </div>
    )
}