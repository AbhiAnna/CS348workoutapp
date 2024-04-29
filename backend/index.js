import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2414",
    database: "test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

// Endpoint to insert calories data
app.post("/calories", (req, res) => {
    const q = "INSERT INTO dates (calories, Date) VALUES (?, ?) ON DUPLICATE KEY UPDATE calories = calories + VALUES(calories)";
    const values = [
        req.body.calories,
        req.body.date
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Calories added");
    });
});

// Endpoint to retrieve total and average calories
app.get("/calories", (req, res) => {
    const q = "SELECT SUM(calories) AS totalCalories, AVG(calories) AS averageCalories, COUNT(DISTINCT Date) AS uniqueDates FROM dates";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

app.get("/workouts", (req, res) => {
    const sortBy = req.query.sortBy || 'Workout Name'; // Default sorting by Workout Name
    const category = req.query.category || 'none'; // Default filtering by Workout Name
    const value = req.query.value || ''; // Default empty value

    if (category !== 'none') {
        const q = `CALL FilterWorkoutsByCategory('${category}', '${value}')`;
        db.query(q, (err, data) => {
            if (err) return res.json(err)
            return res.json(data[0]); 
        });
    } else {
        const q = `CALL GetSortedWorkouts('${sortBy}')`;
        db.query(q, (err, data) => {
            if (err) return res.json(err)
            return res.json(data[0]); 
        });
    }
});


app.get("/average-workouts", (req, res) => {
    const category = req.query.category || 'none'; 
    const value = req.query.value || ''; 

    if (category !== 'none') {
        const q = `SELECT AVG(Sets) AS avgSets, AVG(Reps) AS avgReps, AVG(Weight) AS avgWeight FROM workouts WHERE ${category} = ?`;
        db.query(q, [value], (err, data) => {
            if (err) return res.json(err)
            return res.json(data[0]);
        });
    } else {
        const q = "SELECT AVG(Sets) AS avgSets, AVG(Reps) AS avgReps, AVG(Weight) AS avgWeight FROM workouts";
        db.query(q, (err, data) => {
            if (err) return res.json(err)
            return res.json(data[0]);
        });
    }
});

app.delete("/workouts/:id", (req, res) => {
    const workoutId = req.params.id
    const q = "DELETE FROM workouts WHERE id = ?"

    db.query(q, [workoutId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Workout Deleted");
    })
})

app.post("/workouts", (req, res) => {
    const q = "INSERT INTO workouts (`Workout Name`, `Sets`, `Reps`, `Weight`, `date`) VALUES (?)";
    const values = [
        req.body.WorkoutName,
        req.body.Sets,
        req.body.Reps,
        req.body.Weight,
        req.body.Date
    ];

    db.beginTransaction((err) => {
        if (err) throw err;

        db.query(q, [values], (err, data) => {
            if (err) {
                db.rollback(() => {
                    throw err;
                });
            }

            const dateQuery = "INSERT INTO dates (calories, Date) VALUES (?, ?)";
            const dateValues = [0, req.body.Date]; // Assuming initial calories consumed is 0

            db.query(dateQuery, dateValues, (dateErr, dateData) => {
                if (dateErr) {
                    db.rollback(() => {
                        throw dateErr;
                    });
                }

                db.commit((commitErr) => {
                    if (commitErr) {
                        db.rollback(() => {
                            throw commitErr;
                        });
                    }
                    return res.json("Workout Added");
                });
            });
        });
    });
});

app.put("/workouts/:id", (req, res) => {
    const workoutId = req.params.id;
    const q = "UPDATE workouts SET `Workout Name` = ?, `Sets` = ?, `Reps` = ?, `Weight` = ?, `date` = ? WHERE id = ?";
    const values = [
        req.body.WorkoutName,
        req.body.Sets,
        req.body.Reps,
        req.body.Weight,
        req.body.Date,
        workoutId
    ];

    db.beginTransaction((err) => {
        if (err) throw err;

        db.query(q, values, (updateErr, updateData) => {
            if (updateErr) {
                db.rollback(() => {
                    throw updateErr;
                });
            }

            const dateQuery = "INSERT INTO dates (calories, Date) VALUES (?, ?) ON DUPLICATE KEY UPDATE calories = VALUES(calories)";
            const dateValues = [0, req.body.Date];

            db.query(dateQuery, dateValues, (dateErr, dateData) => {
                if (dateErr) {
                    db.rollback(() => {
                        throw dateErr;
                    });
                }

                db.commit((commitErr) => {
                    if (commitErr) {
                        db.rollback(() => {
                            throw commitErr;
                        });
                    }
                    return res.json("Workout Updated");
                });
            });
        });
    });
});

app.listen(8800, () => {
    console.log("Connected to backend!")
})
