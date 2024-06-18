import { getCourses, getUserProgress } from "@/db/queries"
import { List } from "./list"


const CoursePage = async () => {
    const courses = await getCourses()
    const userProgress = await getUserProgress()

    return (
        <div className="sm:ml-4">
            <h1 className="text-2xl font-bold text-stone-700/100 dark:text-stone-200/100">
                Melajah Basa Bali
            </h1>
            <List 
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    )
}

export default CoursePage