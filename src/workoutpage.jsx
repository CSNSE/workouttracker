import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WorkoutCreateForm from "./ui-components/WorkoutCreateForm";

function Allworkouts() {
    const navigate = useNavigate();

    // Corrected: Directly define navBack as the function to be executed on click
    const navBack = () => {
        navigate('/');
    };

    const location = useLocation();
    const pathname = location.pathname;

    const parts = pathname.split(':');
    const exercise = parts[parts.length-1];


    return (
        <div className='AllPage'>
            <p>This is the {exercise} page</p>
            <WorkoutCreateForm/>
            <button onClick={navBack}>Back</button> {/* Directly use navBack here */}
        </div>
    );
}

export default Allworkouts;
