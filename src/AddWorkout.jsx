import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './App.css';
import CustomWorkoutCreateForm from "./CustomWorkoutCreateForm";
import BackButton from "./BackButton";

function AddWorkout() {
    const location = useLocation();
    const [cid, setCid] = useState(''); // Add state to hold the CID

    useEffect(() => {
        const splitPath = location.pathname.split('/AddWorkout/');
    
        if (splitPath.length > 1) {
          const id = splitPath[1]; // Extract the ID
          console.log(id);
          setCid(id); // Set the CID using the extracted ID
        }
    }, [location]);
console.log(cid)
    return (
        <div>
            <header className='App-header'>
                {/* Pass cid as a prop to CustomWorkoutCreateForm */}
                <CustomWorkoutCreateForm cid={cid}/>
                <BackButton />
            </header>
        </div>
    );
}

export default AddWorkout;
