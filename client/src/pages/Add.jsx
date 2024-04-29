import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Add.css'; // Import CSS file for styling

const Add = () =>{
    const [workout, setWorkout] = useState({
        WorkoutName:"",
        Sets: null,
        Reps: null,
        Weight: null,
        Date: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setWorkout((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/workouts", workout);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className='add-container'>
            <h1 className="heading">Add Workout</h1>
            <form className="add-form">
                <input className="input" type="text" placeholder='Name' onChange={handleChange} name="WorkoutName" />
                <input className="input" type="number" placeholder='Sets' onChange={handleChange} name="Sets"/>
                <input className="input" type="number" placeholder='Reps' onChange={handleChange} name="Reps"/>
                <input className="input" type="number" placeholder='Weight' onChange={handleChange} name="Weight"/>
                <input className="input" type="date" placeholder='Date' onChange={handleChange} name="Date" />
                <button className="add-button" onClick={handleClick}>Add</button>
            </form>
        </div>
    );

};

export default Add;
