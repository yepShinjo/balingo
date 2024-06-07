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


*1. Relationship Name : **userProgress** | Relationship holder = **coursesRelations**
description :
courses table with userProgress table - one to many

*2. Relationship Name : **activeCourse** | Relationship holder = **userProgressRelations**
description :
courses table with userProgress table - one to one