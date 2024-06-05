import { cache } from "react";
import db from "./drizzle";

// were using cache so we dont have to constantly query the DB all the time

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany()

    return data
})