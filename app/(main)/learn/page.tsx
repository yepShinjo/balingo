import { FeedWrapper } from "@/components/ui/feed-wrapper"
import { StickyWrapper } from "@/components/ui/sticky-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/ui/user-progress"

const LearnPage = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={{ title: 'Japanese', imageSrc: '/jp.svg' }}
                    hearts={5}
                    points={100}
                    hasActiveSubscription={false}
                >
                </UserProgress>
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Japanese" />
            </FeedWrapper>
        </div>
    )
}

export default LearnPage