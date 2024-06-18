import { getLesson, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"
import { Quiz } from "./quiz"
import { challengeOptions } from "@/db/schema"


const LessonPage = async () => {
    // get important data
    const lessonData = await getLesson()
    const userProgressData = await getUserProgress()

    const [
        lesson,
        userProgress,
    ] = await Promise.all([
        lessonData,
        userProgressData
    ])

    if (!lesson || !userProgress) {
        redirect("/learn")
    }

    // fix later, percentage doesnt work
    const initialPercentage = 
    lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100

    return (
        // user subscription query later
        <>
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={null}
        />
        </>
        
    )
}

export default LessonPage