"use server"

import db from "@/db/drizzle"
import { getCourseById, getUserProgress } from "@/db/queries"
import { userProgress } from "@/db/schema"
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


//upsert = update or insert. if no record -> insert. if yes record -> update
export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth()
    const user = await currentUser()

    // why tho ? if there are no user ID return unauthorized
    // but if they userId is there, but there are no ESSENTIAL user data, then also retun unauthorized
    if (!userId || !user) {
        throw new Error("Unauthorized")
    }

    // check if course exists
    const course = await getCourseById(courseId)

    if (!course) {
        throw new Error("Course not found")
    }

    // Enable once units and lessons are added
    // if (!course.units.length || !course.units[0].lessons.length) {
    //     throw new Error("Course is empty")
    // }


    // after checking if the user and course exist, we continue to check the progress of that user

    const existingUserProgress = await getUserProgress()

    // well, now we know that the USER do exist, and the COURSE do exist
    // now we check if the user has already progressed or not

    // if they already progressed, then update the DB
    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        })

        // then break out of the function by revalidating (revalidate basically means to update the cache)
        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn")
    }

    // if they haven't progressed, then insert into the DB
    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
    })

    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn")
}