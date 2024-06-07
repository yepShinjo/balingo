## everysingle component and page created in the app folder is also a server component 

Folder structure :

(marketing)
contains signup page

(main)
contains the actual app from the default route (which is /learn) and others
    | learn |
    this is the default route


## migration error

### nuke database
go to 
website neon.tech -> project -> triple dot on Balingo -> setting -> delete

then, create new database -> dashboard -> copy connection string and paste it back into DATABASE_URL inside .env -> go to terminal -> npm run db:push -> npm run db:seed


## Schema.ts (Database)

### Table
table 1 = courses
table 2 = userProgress

### Relation

Why It Seems Confusing

The confusion arises because:

    Contextual Interpretation: The many and one functions are used in the context of how the data is fetched or related, not necessarily reflecting the exact nature of the relationship (one-to-many or many-to-many) in the database schema terminology.

    Implicit Understanding: These functions are implicitly understood to refer to the direction and multiplicity of the relationship, but they don't explicitly spell out the entire relationship type (e.g., one-to-many or many-to-many).

    One-to-Many: A single course can have many userProgress records. This is expressed with many(userProgress) in the coursesRelations.

    One-to-One: A single userProgress record has one activeCourse. This is expressed with one(courses) in the userProgressRelations.


#### To avoid confusion, it might be helpful to think of many and one in these definitions as referring to how many records in the related table (userProgress or courses) are associated with a single record in the source table (courses or userProgress), respectively.

#### Example
    // relationship name is courses. relationship holder is coursesRelations. courses can have "many"
    export const coursesRelations = relations(courses, ({ many }) => ({
        // courses can have many userProgress
        userProgress : many(userProgress), 
        // courses can have many units
        units: many(units),
    }))


*1. Relationship Name : **userProgress** | Relationship holder = **coursesRelations**
description :
courses table with userProgress table - one to many


*2. Relationship Name : **activeCourse** | Relationship holder = **userProgressRelations**
description :
courses table with userProgress table - one to one

*3. Relationship Name : **course** | Relationship holder = **unitRelations**
description :
units table with courses table - one to one

Base Table: units
Relationship Name: course
Type of Connection: one (indicating a one-to-one or one-to-many relationship from the perspective of units)
in this example | course: one(courses, { | it is a one to one.

End Table: courses
Fields Connecting:

    fields: [units.courseId] from the units table
    references: [courses.id] from the courses table


## perfect explanation


    export const courses = pgTable("courses", {
        id: serial("id").primaryKey(),
        title: text("title").notNull(),
        imageSrc: text("image_src").notNull(),
    })

    export const coursesRelations = relations(courses, ({ many }) => ({
        userProgress : many(userProgress), 
        units: many(units),
    }))

    export const units = pgTable("units", {
        id: serial("id").primaryKey(),
        title: text("title").notNull(),
        description: text("description").notNull(),
        courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade"}).notNull(),
        order: integer("order").notNull(),
    })

    export const unitsRelations = relations(units, ({ many, one }) => ({
        course: one(courses, {
            fields: [units.courseId],
            references: [courses.id],
        }),
        lesson: many(lessons),
    }))

    export const lessons = pgTable("lessons", {
        id: serial("id").primaryKey(),
        title: text("title").notNull(),
        unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade"}).notNull(),
        order: integer("order").notNull(),
    })

Here we have "courses" "units" "lessons" table

first relation coursesRelations:
connecting **courses** with **userProgress** => one courses can have many userProgress

second relation unitsRelations :
connecting **units** with **courses** => one units can only have one courses (an unit is only attached to one courses), and

connecting **units** with **lessons** => one units can have many lessons

notice in the above type of connection and examples we can only have "one to one" or "one to many" because it is always seen from the "Base Table"
one Base Table can have {one} relation with end table, or
one Base Table can have {many} relation with end table. Thats all