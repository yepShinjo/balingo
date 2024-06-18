"use client";

import { challengeOptions, challenges as challengeSchema } from "@/db/schema"
import { useState, useTransition, useEffect } from "react"
// import { useRouter } from "next/router"
import { Header } from "./header"
import { QuestionBubble } from "./question-bubble"
import { Challenge } from "./challenge"
import { Footer } from "./footer"
import { upsertChallengeProgress } from "@/actions/challenge-progress"
import { toast } from "sonner"

type Props = {
    initialPercentage: number
    initialHearts: number
    initialLessonId: number
    initialLessonChallenges: (typeof challengeSchema.$inferSelect & {
        completed: boolean
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    // const router = useRouter()const [pending, startTransition] = useTransition()
const [pending, startTransition] = useTransition()
const [hearts, setHearts] = useState(initialHearts)
const [percentage, setPercentage] = useState(initialPercentage)
const [challenges] = useState(initialLessonChallenges)
const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
})

const [selectedOption, setSelectedOption] = useState<number>()
const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")

const challenge = challenges[activeIndex]

const options = challenge?.challengeOptions ?? []

console.log("activeIndex", activeIndex)

// Bug : it will go next and next and next even tho there are no more challenges
// could just say return at the end of the loop, but needed to review how to count the completed challenges
// another Bug : dont know why the lesson cant be completed even tho challenges are all completed

const onNext = () => {
    setActiveIndex((current) => current + 1);
};


// get the option when the user click "cek"
const onSelect = (id: number) => {
    if (status !== "none") return

    setSelectedOption(id)
}

// will be able to be fired when status is correct or even wrong
const onContinue = () => {
    if (!selectedOption) return

    // if they choose wrong, let them choose again
    if (status === "wrong") {
        setStatus("none")
        setSelectedOption(undefined)
        return
    }

    if (status === "correct") {
        onNext()
        setStatus("none")
        setSelectedOption(undefined)
        return
    }

    const correctOption = options.find((option) => option.correct)

    if (!correctOption) {
        return
    }

    if (correctOption && correctOption.id === selectedOption) {
        startTransition(() => {
            upsertChallengeProgress(challenge.id).then((response) => {
                if (response?.error === "hearts") {
                    console.error("missing hearts")
                    return
                }

                setStatus("correct")
                setPercentage((prev) => prev + 100 / challenges.length)

                // Practice
                if (initialPercentage === 100) {
                    setHearts((prev) => Math.min(prev + 1, 5))
                }
            })
            .catch(() => toast.error("Something went wrong"))
        })
    } else {
        console.error("incorrect option!")
    }
}

console.log("challenge", challenge)

const title = challenge.type === "ASSIST" 
    ? "Nu cen sane beneh ?" 
    : challenge.question

return (
    <>
        <Header 
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubscription?.isActive}
        />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                {/* set window for sm md lg. focus on devices rather than arbitrary screen value inside the dam code */}
                <div className=" md:w-[550px] lg:min-h-[350px] lg:w-[600px] w-full md:px-20 px-6 lg:px-0 flex flex-col mx-auto gap-y-12">
                    <h1 className=" text-lg md:text-2xl lg:text-4xl text-center lg:text-start font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 shadow-md p-4 rounded-lg">
                        {title}
                    </h1>
                    <div>
                        {challenge.type === "ASSIST" && (
                            <QuestionBubble question={challenge.question} />
                        )}
                        <Challenge 
                            options={options}
                            onSelect={onSelect}
                            status={status}
                            selectedOption={selectedOption}
                            disabled={false}
                            type={challenge.type}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
        <Footer
            disabled={!selectedOption}
            status={status}
            onCheck={onContinue}
        />
    </>
)
};
