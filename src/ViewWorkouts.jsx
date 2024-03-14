import React from "react";
import { useLocation } from "react-router-dom";
import { useState  } from "react";
import { useEffect } from "react";
import './App.css'
import { Button, Divider, TextAreaField, TextField } from "@aws-amplify/ui-react";
import { getSession } from "./graphql/queries";
import { getWorkout } from "./graphql/queries";
import { useNavigate } from "react-router-dom";
import CustomViewWorkoutsHeader from "./CustomWorkoutHeader";
import DispWorkoutsBySessionCollection from "./DispWorkoutsBySessionCollection";
import AddWorkout from "./AddWorkout";
import BigButton from "./BigButton";
import DisplayWorkoutsCollection from "./ui-components/DisplayWorkoutsCollection";
function ViewWorkouts(){
    const location = useLocation();
    const [cid, setCid] = useState(''); // State to hold the CID
    const navigate = useNavigate();
    useEffect(() => {
      // Assuming the path is "/DispWorkouts/<cid>"
      const splitPath = location.pathname.split('/DispWorkouts/');
  
      if (splitPath.length > 1) {
        const id = splitPath[1]; // Extract the ID
        setCid(id); // Set the CID using the extracted ID
      }
    }, [location]); // Depend on location to re-run this effect

    useEffect(() => {
      }, [cid]);

    
    return (
        <div >  
            <CustomViewWorkoutsHeader id={cid}/>
            <DispWorkoutsBySessionCollection />
            <BigButton onClick={() => navigate('/AddWorkoutFromDisplay/'+cid)} label = 'Add Workout'/>
        </div>

    )

}
export default ViewWorkouts;