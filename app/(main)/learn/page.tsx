import { FeedWrapper } from "@/components/ui/feed-wrapper"
import { StickyWrapper } from "@/components/ui/sticky-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/ui/user-progress"
import { getUnits, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"

const LearnPage = async () => {
    const userProgressData = getUserProgress()
    const unitsData = getUnits()
    // try to use Promise instead of await (idk, nextJS said its the best)
    const [
        userProgress,
        units,
    ] = await Promise.all([
        userProgressData,
        unitsData
    ])

    if (!userProgress || !userProgress.activeCourse) {
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
                        {JSON.stringify(unit)}
                    </div>
                ))}
            </FeedWrapper>
        </div>
    )
}

export default LearnPage