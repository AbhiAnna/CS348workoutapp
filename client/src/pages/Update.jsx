import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import './Update.css'; // Import CSS file for styling

const Update = () =>{
    const [workout, setWorkout] = useState({
        WorkoutName:"",
        Sets:null,
        Reps:null,
        Weight:null,
        Date: "" // Added Date field
    });

    const navigate = useNavigate();
    const location = useLocation();
    const workoutID = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const res = await axios.get("http://localhost:8800/workouts/" + workoutID);
                setWorkout(res.data); // Assuming backend sends workout object
            } catch (err) {
                console.log(err);
            }
        };
        fetchWorkout();
    }, [workoutID]);

    const handleChange = (e) => {
        setWorkout((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/workouts/"+ workoutID, workout)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div className='update-container'>
            <h1 className="heading">Update Workout</h1>
            <form className="update-form">
                <input className="input" type="text" placeholder='Name' value={workout.WorkoutName} onChange={handleChange} name="WorkoutName" />
                <input className="input" type="number" placeholder='Sets' value={workout.Sets} onChange={handleChange} name="Sets"/>
                <input className="input" type="number" placeholder='Reps' value={workout.Reps} onChange={handleChange} name="Reps"/>
                <input className="input" type="number" placeholder='Weight' value={workout.Weight} onChange={handleChange} name="Weight"/>
                <input className="input" type="date" placeholder='Date' value={workout.Date} onChange={handleChange} name="Date" />
                <button className="update-button" onClick={handleClick}>Update</button>
            </form>
        </div>
    );
};

export default Update;

/*
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"

const Update = () =>{
    const [workout, setWorkout] = useState({
        WorkoutName:"",
        Sets:null,
        Reps:null,
        Weight:null
    });

    const navigate = useNavigate();
    const location = useLocation();
    const workoutID = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const res = await axios.get("http://localhost:8800/workouts/" + workoutID);
                setWorkout(res.data); // Assuming backend sends workout object
            } catch (err) {
                console.log(err);
            }
        };
        fetchWorkout();
    }, [workoutID]);

    const handleChange = (e) => {
        setWorkout((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/workouts/"+ workoutID, workout)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div className='form'>
            <h1>Update Workout</h1>
            <input type="text" placeholder='Name' value={workout.WorkoutName} onChange={handleChange} name="WorkoutName" />
            <input type="number" placeholder='Sets' value={workout.Sets} onChange={handleChange} name="Sets"/>
            <input type="number" placeholder='Reps' value={workout.Reps} onChange={handleChange} name="Reps"/>
            <input type="number" placeholder='Weight' value={workout.Weight} onChange={handleChange} name="Weight"/>
            <input type="text" placeholder='Date' value={workout.Date} onChange={handleChange} name="Date" />
            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default Update;

*/