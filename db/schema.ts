import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    // there are other types for PK such as integer, uuid, etc, but we choose serial so it auto increment
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
})

