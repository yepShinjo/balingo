import { getCourses } from "@/db/queries"
import { List } from "./list"


const CoursePage = async () => {
    const courses = await getCourses()

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Melajah Basa Bali
            </h1>
            <List 
                courses={courses}
                activeCourseId={1}
            />
        </div>
    )
}

export default CoursePage