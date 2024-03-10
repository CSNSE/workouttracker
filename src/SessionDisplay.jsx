import React from 'react';
import './SessionDisplay.css'; // Make sure to create a corresponding CSS file

function SessionDisplay() {
  // Mocked session data for display
  const sessions = [
    { id: '1', type: 'Push', date: '2023-01-01' },
    { id: '2', type: 'Pull', date: '2023-01-02' },
    { id: '3', type: 'Legs', date: '2023-01-03' },
    { id: '4', type: 'PT', date: '2023-01-04' },
  ];

  return (
    <div className="session-display">
      <h2 className="session-title">Workout Sessions</h2>
    </div>
  );
}

export default SessionDisplay;
