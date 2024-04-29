import React, { useState, useEffect } from 'react';
import axios from "axios";
import './logCalories.css'; // Import CSS file for styling

function LogCalories() {
    const [date, setDate] = useState("");
    const [calories, setCalories] = useState("");
    const [totalCalories, setTotalCalories] = useState(0);
    const [averageCalories, setAverageCalories] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8800/calories");
                const { totalCalories, averageCalories } = response.data;
                setTotalCalories(totalCalories);
                setAverageCalories(averageCalories);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };
        fetchData();
    }, []);

    const handleLog = async () => {
        try {
            await axios.post("http://localhost:8800/calories", { date, calories });
            // Refresh total and average calories after logging
            const response = await axios.get("http://localhost:8800/calories");
            const { totalCalories, averageCalories } = response.data;
            setTotalCalories(totalCalories);
            setAverageCalories(averageCalories);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="log-container">
            <h1 className="heading">Log Calories</h1>
            <div className="form">
                <div className="input-group">
                    <label>Date:</label>
                    <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Calories:</label>
                    <input className="input" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
                </div>
                <button className="log-button" onClick={handleLog}>Log</button>
            </div>

            <div className="summary">
                <h2>Total Calories: {totalCalories}</h2>
                <h2>Average Calories: {averageCalories}</h2>
            </div>
        </div>
    );
}

export default LogCalories;

