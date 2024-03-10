import React from 'react';
import { useNavigate } from 'react-router-dom';
import BigButton from './BigButton';

function WorkoutButtons() {
  const navigate = useNavigate();

  return (
    <div className='large-button'>
        <BigButton label={'Start a New Workout'} onClick={() => (navigate('/new'))}/>
        <BigButton label={'Display Workouts'} onClick={()  => (navigate('/display'))} />
    </div> 
  );
}

export default WorkoutButtons;
