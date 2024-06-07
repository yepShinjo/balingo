import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { courses, units, userProgress } from "./schema";

// just like django.

// were gonna cache all the queries so we dont have to constantly query the DB all the time

export const getUserProgress = cache(async () => {
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const data = await db.query.userProgress.findFirst({
        where:eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    })

    return data
})


// reduce workload from the front end by checking for all the completed challenges

// check if userProgress is completed (ie, if it is 100%)
export const getUnits = cache(async() => {
    const userProgress = await getUserProgress()
    // but to not waste resources, lets check:
    // if there is no userProgress, or if userProgress doesn't have an activeCourse, just return an empty array
    if(!userProgress?.activeCourse) {
        return []
    }

    // retrieves all 'units' where the units.courseId matches with the userProgress.activeCourse.id
    // For each matching 'unit', it needs to include all the related lessons
    // for each of those lessons, it needs to include all the related challenges
    // for each of the challenges, it needs to include all the related challengeProgress

    // the reason why we need this, is because lessons, challenges, and challengeProgress
    // are all related to one another but on all on a different table
    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourse.id),
        with: {
            lessons: {
                with: {challenges: {
                    with: {
                        challengeProgress: true,
                    }
                }},
            }
        }
    })

    // after getting the necessary data, now we will check if all the challenges are completed

    // map over each data (units)
    const normalizedData = data.map((unit) => {
        // for each unit, map over each lesson
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            // for each lesson, check if all the challenges are completed
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                // check if challenge.challengeProgress exist
                // check if challengeProgress.length > 0 (indicating there is progress data)
                // do challenge.challengeProgress.every((progress) => progress.completed) 
                // to ensure every challengeProgress has completed attribute set to true
                return challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed)
            })
            // adds new attribute "completed" to each lesson
            return {...lesson, completed: allCompletedChallenges }
        })
        // returns the unit with the updated lessons to include the "completed" attribute that we just added
        return { ...unit, lessons: lessonsWithCompletedStatus }
    })

    return normalizedData
})


export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany()

    return data
})

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
    })

    return data
})