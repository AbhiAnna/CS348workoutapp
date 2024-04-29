import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Workouts.css'; // Import CSS file for styling

const Workouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllWorkouts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/workouts");
                const groupedWorkouts = groupWorkoutsByDate(res.data);
                setWorkouts(groupedWorkouts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllWorkouts();
    }, []);

const groupWorkoutsByDate = (workouts) => {
    const groupedWorkouts = {};
    workouts.forEach(workout => {
        // Create a new Date object using the workout's date string
        const workoutDate = new Date(workout.date);
        // Get the UTC date string (this considers timezone offsets)
        const date = workoutDate.toISOString().split('T')[0];
        // If the date is not yet a key in groupedWorkouts, create an empty array
        if (!groupedWorkouts[date]) {
            groupedWorkouts[date] = [];
        }
        // Push the workout into the array corresponding to its date
        groupedWorkouts[date].push(workout);
    });
    return groupedWorkouts;
};


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/workouts/${id}`);
            const updatedWorkouts = Object.values(workouts).map(arr => arr.filter(w => w.id !== id));
            setWorkouts(updatedWorkouts);
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="workouts-container">
            <h1 className="heading">Workout List</h1>
            {Object.keys(workouts).length === 0 && (
                <p className="no-workouts">No workouts available</p>
            )}
            {Object.keys(workouts).map(date => (
                <div key={date} className="workout-date">
                    <h2 className="date">{date}</h2>
                    <div className="workouts">
                        {workouts[date].map(workout => (
                            <div className="workout" key={workout.id}>
                                <h3 className="workout-name">{workout["Workout Name"]}</h3>
                                <p className="info">Sets: {workout.Sets}</p>
                                <p className="info">Reps: {workout.Reps}</p>
                                <p className="info">Weight: {workout.Weight}</p>
                                <div className="buttons">
                                    <button className="delete" onClick={() => handleDelete(workout.id)}>Delete</button>
                                    <button className="update"><Link to={`/update/${workout.id}`}>Update</Link></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="buttons">
                <Link to="/add" className="button add-button">Add Workout</Link>
                <Link to="/search" className="button search-button">Search Workouts</Link>
                <Link to="/logCalories" className="button log-button">Log Calories</Link>
            </div>
        </div>
    );
};

export default Workouts;



/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Workouts.css'; // Import CSS file for styling

const Workouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllWorkouts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/workouts");
                const groupedWorkouts = groupWorkoutsByDate(res.data);
                setWorkouts(groupedWorkouts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllWorkouts();
    }, []);

    const groupWorkoutsByDate = (workouts) => {
        const groupedWorkouts = {};
        workouts.forEach(workout => {
            const date = new Date(workout.date).toDateString();
            if (!groupedWorkouts[date]) {
                groupedWorkouts[date] = [];
            }
            groupedWorkouts[date].push(workout);
        });
        return groupedWorkouts;
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/workouts/${id}`);
            const updatedWorkouts = Object.values(workouts).map(arr => arr.filter(w => w.id !== id));
            setWorkouts(updatedWorkouts);
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="workouts-container">
            <h1>Workout List</h1>
            {Object.keys(workouts).length === 0 && (
                <p>No workouts available</p>
            )}
            {Object.keys(workouts).map(date => (
                <div key={date} className="workout-date">
                    <h2>{date}</h2>
                    <div className="workouts">
                        {workouts[date].map(workout => (
                            <div className="workout" key={workout.id}>
                                <h3>{workout["Workout Name"]}</h3>
                                <p>Sets: {workout.Sets}</p>
                                <p>Reps: {workout.Reps}</p>
                                <p>Weight: {workout.Weight}</p>
                                <div className="buttons">
                                    <button className="delete" onClick={() => handleDelete(workout.id)}>Delete</button>
                                    <button className="update"><Link to={`/update/${workout.id}`}>Update</Link></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="buttons">
                <button className="add-button">
                    <Link to="/add">Add Workout</Link>
                </button>
                <button className="search-button">
                    <Link to="/search">Search Workouts</Link>
                </button>
                <button className = "log-button">
                    <Link to="/logCalories">Log Calories</Link>
                </button>
            </div>
        </div>
    );
};

export default Workouts;
*/