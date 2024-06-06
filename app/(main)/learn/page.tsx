import { FeedWrapper } from "@/components/ui/feed-wrapper"
import { StickyWrapper } from "@/components/ui/sticky-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/ui/user-progress"
import { getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"

const LearnPage = async () => {
    const userProgressData = getUserProgress()
    // try to use Promise instead of await (idk, nextJS said its the best)
    const [
        userProgress
    ] = await Promise.all([
        userProgressData
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
            </FeedWrapper>
        </div>
    )
}

export default LearnPage