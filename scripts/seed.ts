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
        console.log("Seeding finished")
    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed the database")
    }
}

main()