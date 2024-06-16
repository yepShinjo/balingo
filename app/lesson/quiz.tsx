"use client"

import { challengeOptions, challenges } from "@/db/schema"
import { useState, useTransition } from "react"
import { Header } from "./header"
import { QuestionBubble } from "./question-bubble"
import { Challenge } from "./challenge"
import { Footer } from "./footer"
import { upsertChallengeProgress } from "@/actions/challenge-progress"
import { toast } from "sonner"
import { redirect } from "next/dist/server/api-utils"



type Props = {
    initialPercentage: number
    initialHearts: number
    initialLessonId: number
    // THE FRIKKIN PROBLEM is that challengeOptions just retrieve the first challengeOptions (Id number 1) 
    // instead of the entire challengeOptions that correspond tot the specific challenge
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean
        challengeOptions: typeof challengeOptions.$inferSelect[]
    })[]
    userSubscription: any
}

export const Quiz = ({ 
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const [pending, startTransition] = useTransition()
    
    const [hearts, setHearts] = useState(50 || initialHearts)
    const [percentage, setPercentage] = useState(50 || initialPercentage)
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

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };
    
    
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
        ? "Select the correct meaning" 
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
                    <div className=" lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-4xl text-center lg:text-start font-bold text-neutral-700">
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
}