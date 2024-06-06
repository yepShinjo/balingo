import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    // there are other types for PK such as integer, uuid, etc, but we choose serial so it auto increment
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
})

// for all the courses that the user is progressing
export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress : many(userProgress),
}))

export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
    // activeCourseId is an FK inside userProgress table. taken from the courses table (specifically the courses.id)
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade"}),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
})


// for the course that is CURRENTLY active by the user

// userProgress one to one with courses. the name of the relationship is "activeCourse"
// the related attribute are :
                              // activeCourseId FROM userProgress
                              // courses.id FROM courses
export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id]
    })
}))