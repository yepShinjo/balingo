import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle(sql, { schema })

const main = async () => {
    try {
        console.log("Seeding database")

        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeProgress)

        await db.insert(schema.courses).values([
            // i put id inside, but i dont need to, cuz i used serial (which will auto increment) in the schema.ts instead of integer
            {
                id: 1,
                title: "Singgih",
                imageSrc: "/singgih.svg"
            },
            {
                id: 2,
                title: "Mider",
                imageSrc: "/mider.svg"
            },
            {
                id: 3,
                title: "Sor",
                imageSrc: "/sor.svg"
            },
        ])

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, // singgih
                title: "Unit 1",
                description: "Melajah basa bali singgih sewai wai",
                order: 1
            },
            
        ])

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1, // Unit 1 (Melajah basa bali singgih sewai wai)
                title: "kruna kria", // kata kerja
                order: 1
            },
            {
                id: 2,
                unitId: 1,
                title: "kruna aran", // kata kerja
                order: 2
            },
            {
                id: 3,
                unitId: 1,
                title: "kruna 3", // kata kerja
                order: 3
            },
            {
                id: 4,
                unitId: 1,
                title: "kruna 4", // kata kerja
                order: 4
            },
            {
                id: 5,
                unitId: 1,
                title: "kruna 5", // kata kerja
                order: 5
            },
        ])

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'nu cen sane "muani"?'
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 1,
                question: 'nu cen sane "muani"?'
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                text: "Muani",
                correct: true,
                imageSrc: "/muani.png",
                audioSrc: "/singgih_muani.mp3"
            },
            {
                id: 2,
                challengeId: 1,
                text: "luh",
                correct: false,
                imageSrc: "/luh.png",
                audioSrc: "/singgih_luh.mp3"
            },
            {
                id: 3,
                challengeId: 1,
                text: "Robot",
                correct: false,
                imageSrc: "/robot.png",
                audioSrc: "/singgih_robot.mp3"
            },
        ])

        console.log("Seeding finished")
    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed the database")
    }
}

main()