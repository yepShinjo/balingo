import { lessons, units } from "@/db/schema"
import { desc } from "drizzle-orm"
import { UnitBanner } from "./unit-banner"
import { LessonButton } from "./lesson-button"

type Props = {
    id: number
    order: number
    title: string
    description: string
    // An array of lesson objects. Each lesson object includes all properties inferred from the lessons table, plus an additional completed boolean property
    lessons: (typeof lessons.$inferSelect & {
        completed: boolean
    })[]
    // An object representing the active lesson. It includes all properties inferred from the lessons table, plus a unit property (which is an object with properties inferred from the units table). This can also be undefined if there is no active lesson.
    activeLesson: typeof lessons.$inferSelect & {
        units: typeof units.$inferSelect
    } | undefined
    activeLessonPercentage: number
}

export const Unit = ({ id, 
    order, 
    title, 
    description, 
    lessons, 
    activeLesson, 
    activeLessonPercentage 
}: Props) => {
    return (
        <>
            <UnitBanner title={title} description={description}/>
            <div className="flex items-center flex-col relative">
                {lessons.map((lesson, index) => {
                    // if lesson.id matched the current activeLesson then that means CURRENTLY the user is learning that lesson (hence the name isCurrent)
                    const isCurrent = lesson.id === activeLesson?.id
                    // if the lesson were looping doesnt have a completed and IS NOT the current lesson that means the lesson is locked (why check !isCurrent aswell? cuz the lesson the user currently learning can be not completed aswell)
                    const isLocked = !lesson.completed && !isCurrent

                    return (
                        <LessonButton 
                            key={lesson.id}
                            id={lesson.id}
                            index={index}
                            totalCount={lessons.length - 1}
                            locked={isLocked}
                            current={isCurrent} 
                            percentage={activeLessonPercentage}
                        />
                    )
                })}
            </div>
        </>
    )
}