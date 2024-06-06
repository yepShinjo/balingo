"use client"

import { courses, userProgress } from "@/db/schema"
import { Card } from "./card"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { upsertUserProgress } from "@/actions/user-progress"
import { toast } from "sonner"

type Props = {

    // $inferInsert doesnt actually insert the courses into the DB. it just prepared the data for the communication between component and db
    courses: typeof courses.$inferInsert[]
    // basically $inferSelect just took the activeCourseId from the userProgress table and automatically also took the type of activeCourseId and assign it to the props inside my list.tsx which is also happened to be called activeCourseId. and all of that is optional. (the process of taking the type automatically is done by the "inferSelect").

    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

export const List = ({courses, activeCourseId}: Props) => {
    const router = useRouter()

    // useTransition broken down to two elements:
    // pending: boolean (true if transition is ongoing, false if not)
    // startTransition: a function to start the transition mode
    const [pending, startTransition] = useTransition()

    const onClick = (id: number) => {
        // IF there is already a transition in progress, just return
        if(pending) return

        // IF the id that the user is clicking mathed with the activeCourseId
        if (id === activeCourseId) {
            return router.push("/learn")
        }

        // ELSE, meaning there are no transition that is currently running, and the id that is being clicked is not the same as activeCourseId

        // Start the transition and call the upsertUserProgress
        // upsertUserProgress will update or insert user progress and revalidate path (refresh the cache)
        startTransition(() => {
            upsertUserProgress(id)
                .catch(() => toast.error("Something went wrong"))
        })
    }

    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card
                    key={course.id}
                    id={course.id as number}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onClick={onClick}
                    disable={pending}
                    active={course.id === activeCourseId}
                />
            ))}
        </div>
    )
}