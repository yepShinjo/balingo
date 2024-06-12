import { getLesson, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"

const LessonPage = async () => {

    // FIX GET LESSON
    
    const lessonData = await getLesson()
    const userProgressData = await getUserProgress()

    const [lesson, userProgress] = await Promise.all([lessonData, userProgressData])

    console.log("Lesson Data:", lesson) // This will log on the server

    if (!lesson || !userProgress) {
        redirect("/learn")
    }

    return (
        <div>
            <h1>Lesson Data</h1>
            <pre>{JSON.stringify(lesson, null, 2)}</pre>
            <h1>User Progress</h1>
            <pre>{JSON.stringify(userProgress, null, 2)}</pre>
        </div>
    )
}

export default LessonPage
