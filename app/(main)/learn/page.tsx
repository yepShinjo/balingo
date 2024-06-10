import { FeedWrapper } from "@/components/ui/feed-wrapper"
import { StickyWrapper } from "@/components/ui/sticky-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/ui/user-progress"
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"
import { Unit } from "./unit"

const LearnPage = async () => {
    const userProgressData = getUserProgress()
    const courseProgressData = getCourseProgress()
    const lessonPercentageData = getLessonPercentage()
    const unitsData = getUnits()
    // try to use Promise instead of await (idk, nextJS said its the best)
    const [
        userProgress,
        units,
        courseProgress,
        lessonPercentage,
    ] = await Promise.all([
        userProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData,
    ])

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }

    if (!courseProgress || !courseProgress.activeLesson) {
        redirect("/courses")
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                >
                </UserProgress>
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    )
}

export default LearnPage