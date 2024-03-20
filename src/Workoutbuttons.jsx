import React from 'react';
import { useNavigate } from 'react-router-dom';
import BigButton from './BigButton';

function WorkoutButtons() {
  const navigate = useNavigate();

  return (
    <div className='large-button'>
        <button className='Big-Button' onClick={() => (navigate('/new'))}>Start a new Workout</button>
        <button className='Big-Button' onClick={()  => (navigate('/display'))}>Display Workouts</button>
    </div> 
  );
}

export default WorkoutButtons;
