### here is what it would look like after querying the code like this (taking all those different data from all the different table that are related to one another )

#### The Code
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

#### The Visualization
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


## here is the normalization part

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