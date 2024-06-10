import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { challengeProgress, courses, lessons, units, userProgress } from "./schema";

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
    const { userId } = await auth()
    const userProgress = await getUserProgress()
    // but to not waste resources, lets check:
    // if there is no userProgress, or if userProgress doesn't have an activeCourse, just return an empty array
    if(!userId || !userProgress?.activeCourse) {
        return []
    }

    // retrieves all 'units' where the units.courseId matches with the userProgress.activeCourse.id
    // For each matching 'unit', it needs to include all the related lessons
    // for each of those lessons, it needs to include all the related challenges
    // for each of the challenges, it needs to include all the related challengeProgress

    // the reason why we need this, is because lessons, challenges, and challengeProgress
    // are all related to one another but on all on a different table

    // TODO: Confirm wheter order is needed 
    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourse.id),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(
                                    challengeProgress.userId,
                                    userId
                                ),
                            },
                        },
                    },
                },
            },
        }, // made me hate curly braces a little, but its ok now
    })

    // after getting the necessary data, now we will check if all the challenges are completed

    // map over each data (units)
    const normalizedData = data.map((unit) => {
        // for each unit, map over each lesson
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            if (
                lesson.challenges.length === 0
            ) {
                return {...lesson, completed: false}
            }
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

// fetch data for user in active course
export const getCourseProgress = cache(async () => {
    const { userId } = await auth()
    const userProgress = await getUserProgress()
    
    // if there is no user or no userProgress, just return null. The reason why we also check userProgress.activeCourseId is because TS needed more specification for later on
    if (!userId || !userProgress || !userProgress.activeCourseId) {
        return null
    }

    // find all the units in the active course
    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    units: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            },
                        },
                    },
                },
            },
        },
    })
    // the ONE following line. This is equivalent to taking all the lessons from each unit and putting them into one big list of lessons
    const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.lessons).find((lesson) => {
        return lesson.challenges.some((challenge) => {
            return !challenge.challengeProgress || challenge.challengeProgress.length === 0 || challenge.challengeProgress.some((progress) => progress.completed === false)
        })
    })

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    }
})

// if they click on a specific lesson and we have an ID of that lesson then we're gonna laod that lesson. 
//otherwise load the first uncompleted lesson for the user (which we got from getCourseProgress)
export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const courseProgress = await getCourseProgress()

    // we dont import id? why?
    // cuz we use this function inside another component bruh
    const lessonId = id || courseProgress?.activeLessonId

    if(!lessonId) {
        return null
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId)
                    },
                },
            },
        },
    })

    if (!data || !data.challenges) {
        return null
    }

    // The normalization process combines data from the challenges table with data from the challengeProgress table, and it adds a new completed attribute to each challenge.

    // Remember that we do not modify the database here, but just creating a new object to store these normalized data
    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed = 
            challenge.challengeProgress && 
            challenge.challengeProgress.length > 0 && 
            challenge.challengeProgress.every((progress) => progress.completed)

        return {...challenge, completed}
    })

    return { ...data, challenges: normalizedChallenges }
})


export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress()

    if(!courseProgress?.activeLessonId) {
        return 0
    }

    const lesson = await getLesson(courseProgress.activeLessonId)

    if (!lesson) {
        return 0
    }

    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed)
    const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100,)

    return percentage
})