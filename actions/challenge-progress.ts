"use server"

import db from "@/db/drizzle"
import { getUserProgress } from "@/db/queries"
import { challengeProgress, challenges, userProgress } from "@/db/schema"
import { auth, currentUser } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    const currentUserProgress = await getUserProgress()
    // subscription query later

    if (!currentUserProgress) {
        throw new Error("User progress not found")
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })

    if (!challenge) {
        throw new Error("Challenge Not Found")
    }

    const lessonId = challenge.lessonId

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        )
    })

    // means the user is currently practicing this challenge (they already try this challenge before)
    const isPractice = !!existingChallengeProgress

    // not if user dont have a subscription
    if (currentUserProgress.hearts === 0 && !isPractice) {
        return { error: "hearts" }
    }

    // if the user is practicing, update the challengeProgress status to completed

    // the reason why we set the completed field to true even tho the user is practicing an already completed challenge is because we wanna maintain data integrity (who the F knows IF the previous challenge suddently have their complete field became false even tho its already completed)
    
    if (isPractice) {
        await db.update(challengeProgress).set({
            completed: true,
        })
        .where(
            eq(challengeProgress.id, existingChallengeProgress.id)
        )

        // in practice mode, we have to increment the users heart if they choose the right answer.
        // for every correct choicee users points would have to be incremented by 10

        await db.update(userProgress).set({
            // choose the lower of the two values (1 and 5). if user do practice, increment their heart by one (if their heart is less than 5)

            // if their hearts is already 5, dont need to increment it (Math.min will choose 5 instead of currentUserProgress.hearts + 1)
            hearts: Math.min(currentUserProgress.hearts + 1, 5),
            points: currentUserProgress.points + 10,
        }).where(eq(userProgress.userId, userId))

        // Revalidating paths ensures that the user's updated progress is reflected on different pages

        revalidatePath("/learn")
        revalidatePath("/lesson")
        revalidatePath("/quest")
        revalidatePath("/leaderboard")
        revalidatePath(`/lesson/${lessonId}`)
        return
    }

    // if the user is not practicing, create a new challengeProgress
    // this happens when the user attempts a new challenge for the first time.
    await db.insert(challengeProgress).values({
        challengeId,
        userId,
        completed: true,
    })

    // then after creating a new challengeProgress, automatically set their points to 10.
    // we dont need to set the hearts, because its a default of 5 in the DB
    await db.update(userProgress).set({
        points: currentUserProgress.points + 10.
    }).where(eq(userProgress.userId, userId))

    revalidatePath("/learn")
    revalidatePath("/lesson")
    revalidatePath("/quest")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)

}