## here is what it would look like after querying the code like this (taking all those different data from all the different table that are related to one another )

### The Code
    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourse.id),
        with: {
            lessons: {
                with: {challenges: {
                    with: {
                        challengeProgress: true,
                    }
                }},
            }
        }
    })

### The Visualization
    [
    {
        "id": 1,
        "title": "Unit 1",
        "courseId": 101,
        "order": 1,
        "lessons": [
        {
            "id": 10,
            "title": "Lesson 1",
            "unitId": 1,
            "order": 1,
            "challenges": [
            {
                "id": 100,
                "title": "Challenge 1",
                "lessonId": 10,
                "order": 1,
                "challengeProgress": {
                "id": 1000,
                "status": "complete",
                "challengeId": 100
                }
            }
            ]
        }
        ]
    }
    ]


### here is the normalization part

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed)
            })
            return {...lesson, completed: allCompletedChallenges }
        })
        return { ...unit, lessons: lessonsWithCompletedStatus }
    })
    return normalizedData
    

In summary, the code transforms the original data by checking the completion status of challenges within each lesson and adding a completed attribute to each lesson accordingly. The result is a normalized data structure that reflects the completion status of lessons within units.


### The code queries unitsInActiveCourse

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    units: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            },
                        },
                    },
                },
            },
        },
    })

#### Visualization

    const unitsInActiveCourse = [
        {
            id: 1,
            name: "Unit 1",
            order: 1,
            courseId: 101, // Assuming courseId is part of the unit object
            lessons: [
                {
                    id: 101,
                    name: "Lesson 1",
                    order: 1,
                    unitId: 1, // Assuming unitId is part of the lesson object
                    units: [
                        {
                            id: 1,
                            name: "Unit 1",
                            order: 1,
                            courseId: 101
                        },
                        {
                            id: 2,
                            name: "Unit 2",
                            order: 2,
                            courseId: 101
                        }
                    ],
                    challenges: [
                        {
                            id: 1001,
                            name: "Challenge 1",
                            lessonId: 101, // Assuming lessonId is part of the challenge object
                            challengeProgress: [
                                { userId: 123, completed: true },
                                { userId: 456, completed: false }
                            ]
                        },
                        {
                            id: 1002,
                            name: "Challenge 2",
                            lessonId: 101,
                            challengeProgress: [
                                { userId: 123, completed: false }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Unit 2",
            order: 2,
            courseId: 102,
            lessons: [
                {
                    id: 102,
                    name: "Lesson 2",
                    order: 1,
                    unitId: 2,
                    units: [
                        {
                            id: 2,
                            name: "Unit 2",
                            order: 2,
                            courseId: 102
                        }
                    ],
                    challenges: [
                        {
                            id: 1003,
                            name: "Challenge 3",
                            lessonId: 102,
                            challengeProgress: [
                                { userId: 123, completed: true },
                                { userId: 789, completed: true }
                            ]
                        }
                    ]
                }
            ]
        }
    ];


we queries and find all the units. order them by ascending
match those units by doing eq(units.courseId, userProgress.activeCourseId)
and also include all the following table that are related to those units :

lessons (order them by ascending)
    units: true (make sure those lessons have units related to em)
        challenges: with 
            challengeProgress (match the challengeProgress.userId, with the current userId that is logged in). The reason why we need to do this is because challengeProgress is not an attr to challenges. But a whole separate table that is doing many to many relationship with userId (hence the challengeProgress.userId, userId)


### firstUncompletedLesson

    const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.lessons).find((lesson) => {
        return lesson.challenges.some((challenge) => {
            return !challenge.challengeProgress || challenge.challengeProgress.length === 0
        })
    })

you might ask, what THE FUCK is flatMap ???

##### this is the normal .map

    const numbers = [1, 2, 3];
    const doubledNumbers = numbers.map((num) => num * 2);
    // doubledNumbers will be [2, 4, 6]

##### this is flatMap

    const nestedNumbers = [[1, 2], [3, 4], [5, 6]];
    const flatNumbers = nestedNumbers.flatMap((arr) => arr);
    // flatNumbers will be [1, 2, 3, 4, 5, 6]

so, what the code does is basically flatMapping the entire data

#### Visualization

    const firstUncompletedLesson = {
        id: 102,
        name: "Lesson 2",
        order: 1,
        unitId: 2,
        units: [
            {
                id: 2,
                name: "Unit 2",
                order: 2,
                courseId: 102
            }
        ],
        challenges: [
            {
                id: 1003,
                name: "Challenge 3",
                lessonId: 102,
                challengeProgress: [
                    { userId: 123, completed: true },
                    { userId: 789, completed: true }
                ]
            }
        ]
    };

The firstUncompletedLesson essentially flattens the structure by one level compared to the unitsInActiveCourse. Instead of having units containing lessons, it directly provides the first lesson that meets the condition of having an uncompleted challenge. This reduces the hierarchy by one level, making it easier to work with the specific lesson that needs attention or further processing based on your application logic.


### getLesson

#### the code

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed = 
            challenge.challengeProgress && 
            challenge.challengeProgress.length > 0 && 
            challenge.challengeProgress.every((progress) => progress.completed)

        return {...challenge, completed}
    })

    return { ...data, challenges: normalizedChallenges }

#### the visualization

data before normalized

    {
        id: 1,
        title: "Sample Lesson",
        challenges: [
            {
                id: 1,
                question: "What is 2 + 2?",
                challengeProgress: [
                    { userId: 1, completed: true }
                ]
            },
            {
                id: 2,
                question: "What is 3 + 5?",
                challengeProgress: [
                    { userId: 1, completed: false }
                ]
            },
            {
                id: 3,
                question: "What is 10 - 4?",
                challengeProgress: []
            }
        ]
    }


data after each challenge is normalized
return {...challenge, completed} 

    [
        {
            id: 1,
            question: "What is 2 + 2?",
            challengeProgress: [
                { userId: 1, completed: true }
            ],
            completed: true
        },
        {
            id: 2,
            question: "What is 3 + 5?",
            challengeProgress: [
                { userId: 1, completed: false }
            ],
            completed: false
        },
        {
            id: 3,
            question: "What is 10 - 4?",
            challengeProgress: [],
            completed: false
        }
    ]

data after all the data is normaziled (maybe its a bit confusing, but all the data are just challenges. the difference is that, here we added the lesson that correspond to those challenges)

    {
        id: 1,
        title: "Sample Lesson",
        challenges: [
            {
                id: 1,
                question: "What is 2 + 2?",
                challengeProgress: [
                    { userId: 1, completed: true }
                ],
                completed: true
            },
            {
                id: 2,
                question: "What is 3 + 5?",
                challengeProgress: [
                    { userId: 1, completed: false }
                ],
                completed: false
            },
            {
                id: 3,
                question: "What is 10 - 4?",
                challengeProgress: [],
                completed: false
            }
        ]
    }

