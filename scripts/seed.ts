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

        await db.insert(schema.units).values([
            {
                id: 2,
                courseId: 2, // mider
                title: "Unit 1",
                description: "Melajah basa bali mider anggen timpal",
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

        await db.insert(schema.lessons).values([
            {
                id: 6,
                unitId: 2, // Unit 2 (Melajah basa bali mider anggen timpal)
                title: "kruna kria", // kata kerja
                order: 1
            },
            {
                id: 7,
                unitId: 2,
                title: "kruna aran", // kata kerja
                order: 2
            },
            {
                id: 8,
                unitId: 2,
                title: "kruna 3", // kata kerja
                order: 3
            },
            {
                id: 9,
                unitId: 2,
                title: "kruna 4", // kata kerja
                order: 4
            },
            {
                id: 10,
                unitId: 2,
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
                question: 'mana yang laki-laki?'
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: 'laki-laki?'
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'mana yang robot?'
            },
        ])

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 6,
                type: "SELECT",
                order: 1,
                question: 'mana yang artinya "datang"?'
            },
            {
                id: 5,
                lessonId: 6,
                type: "ASSIST",
                order: 2,
                question: 'Tidur?'
            },
            {
                id: 6,
                lessonId: 6,
                type: "SELECT",
                order: 3,
                question: 'mana yang artinya "duduk"?'
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                text: "Muani",
                correct: true,
                imageSrc: "/muani.png",
                audioSrc: "/singgih_muani.mp3"
            },
            {
                challengeId: 1,
                text: "luh",
                correct: false,
                imageSrc: "/luh.png",
                audioSrc: "/singgih_luh.mp3"
            },
            {
                challengeId: 1,
                text: "Robot",
                correct: false,
                imageSrc: "/robot.png",
                audioSrc: "/singgih_robot.mp3"
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2,
                text: "Muani",
                correct: true,
                audioSrc: "/singgih_muani.mp3"
            },
            {
                challengeId: 2,
                text: "luh",
                correct: false,
                audioSrc: "/singgih_luh.mp3"
            },
            {
                challengeId: 2,
                text: "Robot",
                correct: false,
                audioSrc: "/singgih_robot.mp3"
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                text: "Muani",
                correct: false,
                imageSrc: "/muani.png",
                audioSrc: "/singgih_muani.mp3"
            },
            {
                challengeId: 3,
                text: "luh",
                correct: false,
                imageSrc: "/luh.png",
                audioSrc: "/singgih_luh.mp3"
            },
            {
                challengeId: 3,
                text: "Robot",
                correct: true,
                imageSrc: "/robot.png",
                audioSrc: "/singgih_robot.mp3"
            },
        ])

        // SECOND CHALLENGE
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 4,
                text: "negak", // duduk
                correct: false,
                imageSrc: "/negak.png",
                audioSrc: "/mider_negak.mp3"
            },
            {
                challengeId: 4,
                text: "Rauh", // datang
                correct: true,
                imageSrc: "/rauh.png",
                audioSrc: "/mider_rauh.mp3"
            },
            {
                challengeId: 4,
                text: "Sirep", // turu
                correct: false,
                imageSrc: "/sirep.png",
                audioSrc: "/mider_sirep.mp3"
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 5,
                text: "Rauh",
                correct: false,
                audioSrc: "/mider_rauh.mp3"
            },
            {
                challengeId: 5,
                text: "Negak",
                correct: false,
                audioSrc: "/mider_negak.mp3"
            },
            {
                challengeId: 5,
                text: "Sirep",
                correct: true,
                audioSrc: "/mider_sirep.mp3"
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 6,
                text: "Rauh",
                correct: false,
                audioSrc: "/mider_rauh.mp3"
            },
            {
                challengeId: 6,
                text: "Negak",
                correct: true,
                audioSrc: "/mider_negak.mp3"
            },
            {
                challengeId: 6,
                text: "Sirep",
                correct: false,
                audioSrc: "/mider_sirep.mp3"
            },
        ])

        console.log("Seeding finished")
    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed the database")
    }
}

main()