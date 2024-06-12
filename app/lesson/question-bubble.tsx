import Image from "next/image"

type Props = {
    question: string
}

export const QuestionBubble = ({ question }: Props) => {
    return (
        <div className="flex items-center gap-x-4 mb-6">
            <Image 
                src="/mascot.svg"
                alt="mascot"
                width={150}
                height={150}
                className="hidden lg:block"
            />
            <Image 
                src="/mascot.svg"
                alt="mascot"
                width={100}
                height={100}
                className="block lg:hidden"
            />
            <div className="relative py-2 px-4 border-2 rounded-xl text-lg lg:text-lg">
                {question}
                <div 
                    className="absolute -left-3 top-1/2 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-transparent border-r-8 border-r-gray-300 border-b-8 border-b-transparent transform -translate-y-1/2 rotate-180"
                />
            </div>
        </div>
    )
}