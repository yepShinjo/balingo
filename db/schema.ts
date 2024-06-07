import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    // there are other types for PK such as integer, uuid, etc, but we choose serial so it auto increment
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
})

// for all the courses that the user is progressing
export const coursesRelations = relations(courses, ({ many }) => ({
    // courses can have many userProgress
    userProgress : many(userProgress), 
    // courses can have many units
    units: many(units),
}))


export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(), // bagian 1
    description: text("description").notNull(), // melajah basa bali Sor se wai wai
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
})

// units will have a one to one relationship with courses
// units will have a one to many relationship with lessons
export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}))

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
})

// lessons will have a one to many relationship with units
// lessons will have a many to one relationship with challenges
export const lessonsRelations = relations(lessons, ({ many, one }) => ({
    units: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges)
}))

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"])

export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade"}).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull(),
})

export const challengeRelations = relations(challenges, ({ many, one }) => ({
    lessons: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
}))

// answers option
export const challengeOptions = pgTable("challengeOptions", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade"}).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
})

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenges: one(challenges, {
        fields: [challengeOptions.id],
        references: [challenges.id],
    })
}))

export const challengeProgress = pgTable("challengeProgress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(), // TODO : please dont break (better confirm it doesnt break)
    challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade"}).notNull(),
    completed: boolean("completed").notNull().default(false),
})

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenges: one(challenges, {
        fields: [challengeProgress.id],
        references: [challenges.id],
    })
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