import React from 'react';
import { Button } from '@aws-amplify/ui-react';
import './WorkoutButtons.css'
function BigButton({ label, onClick }) {
  return (
    <button className="big-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default BigButton;
