import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Search.css'; // Import CSS file

const Search = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("Workout Name"); // Default sorting option
    const [findCat, setFindCat] = useState("Reps");
    const [findNum, setFindNum] = useState("");
    const [averageStats, setAverageStats] = useState({});

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                let url = 'http://localhost:8800/workouts';
                if (findCat && findNum) {
                    url += `?category=${findCat}&value=${findNum}`;
                } else {
                    url += `?sortBy=${sortBy}`;
                }
                const res = await axios.get(url);
                setWorkouts(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchAverageStats = async () => {
            try {
                const res = await axios.get('http://localhost:8800/average-workouts', {
                    params: {
                        category: findCat,
                        value: findNum
                    }
                });
                setAverageStats(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchWorkouts();
        fetchAverageStats();
    }, [findCat, findNum, sortBy]);

    const handleSortBy = (category) => {
        setSortBy(category);
    };

    const handleInputChange = (event) => {
        setFindNum(event.target.value.toString()); // Convert the input value to string
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Workout List</h1>
                <div className="filters">
                    <button onClick={() => handleSortBy("Reps")}>Reps</button>
                    <button onClick={() => handleSortBy("Sets")}>Sets</button>
                    <button onClick={() => handleSortBy("Weight")}>Weight</button>
                    <button onClick={() => handleSortBy("Workout Name")}>Workout Name</button>
                    <select onChange={e => setFindCat(e.target.value)}>
                        <option value="Reps">Reps</option>
                        <option value="Sets">Sets</option>
                        <option value="Weight">Weight</option>
                        <option value="Workout Name">Workout Name</option>
                    </select>
                    <input
                        type="text"
                        placeholder={"Enter " + findCat}
                        value={findNum}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="content">
                {loading ? <p>Loading...</p> :
                    error ? <p>Error: {error}</p> :
                        workouts.length === 0 ? (
                            <p>No workouts available</p>
                        ) : (
                            <div>
                                <p>Average Sets: {averageStats.avgSets}</p>
                                <p>Average Reps: {averageStats.avgReps}</p>
                                <p>Average Weight: {averageStats.avgWeight}</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Workout Name</th>
                                            <th>Sets</th>
                                            <th>Reps</th>
                                            <th>Weight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workouts.map(workout => (
                                            <tr key={workout.id}>
                                                <td>{workout["Workout Name"]}</td>
                                                <td>{workout.Sets}</td>
                                                <td>{workout.Reps}</td>
                                                <td>{workout.Weight}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default Search;
