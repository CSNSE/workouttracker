import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './MyFeed.css';
import { Icon } from '@aws-amplify/ui-react';

const workoutData = [

];

const WorkoutItem = ({ title, workouts }) => {
  const [expanded, setExpanded] = useState(false);
  const itemRef = useRef(null);

  const handleClickOutside = (event) => {
    if (itemRef.current && !itemRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={itemRef} className="workout-item" onClick={() => setExpanded(!expanded)}>
      <div className="workout-summary">
        <h2>{title}</h2>
        <button className="expand-button" onClick={(e) => e.stopPropagation()}>
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {expanded && (
        <div className="workout-details">
          <ul>
            {workouts.map((workout, index) => <li key={index}>{workout}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

const MyFeed = () => (
  <div className="my-feed">
    <header className="feed-header">
      <h1>Workout Feed</h1>
      <button className="add-button"><FaPlus /></button>
    </header>
    <div className="workout-list">
      {workoutData.map(workout => (
        <WorkoutItem key={workout.id} title={workout.title} workouts={workout.workouts} />
      ))}
    </div>
  </div>
);

export default MyFeed;
