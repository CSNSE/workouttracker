import React, { useEffect, useState } from "react"; // Import useState
import { useLocation, useNavigate } from "react-router-dom";
import './AddWorkout.css'
import CustomWorkoutCreateForm from "./CustomWorkoutCreateForm";
import BackButton from "./BackButton";
import BigButton from "./BigButton";
import { DisplayWorkoutsCollection } from "./ui-components";

function AddWorkoutFromDisplay() {
    const location = useLocation();
    const [cid, setCid] = useState(''); 
    const navigate = useNavigate();
    useEffect(() => {
      const splitPath = location.pathname.split('/AddWorkout/');
  
      if (splitPath.length > 1) {
        const id = splitPath[1]; // Extract the ID
        setCid(id); // Set the CID using the extracted ID
      }
    }, [location]); // Depend on location to re-run this effect

    useEffect(() => {
        console.log(cid);
      }, [cid]);


    return (
        <div>
            <header className='App-header'>
                {/* Pass cid as a prop to CustomWorkoutCreateForm */}
                <CustomWorkoutCreateForm cid={cid}/>
                <BigButton onClick={() => navigate('/DispWorkouts/'+cid )} label = 'Back to Workouts List'/>
            </header>
        </div> 
    );
}

export default AddWorkoutFromDisplay;
