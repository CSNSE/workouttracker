import React from 'react';
import './App.css';
import WorkoutButtons from './Workoutbuttons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Allworkouts from './workoutpage';
import SessionCreateForm from './ui-components/SessionCreateForm';
import DispSessionsCollection from './ui-components/DispSessionsCollection';
import BigButton from './BigButton';
import BackButton from './BackButton';
import { BorderDispSessionsCollection, WorkoutCreateForm } from './ui-components';
import ViewWorkouts from './ViewWorkouts';
import { Button } from '@aws-amplify/ui-react';
import AddWorkoutFromDisplay from './AddWorkoutFromDisplay';
import CustomDispSessionCollection from './CustomDispSessionsCollection';
import Footer from './Footer';
import CustomSessionCreateForm from './CustomSessionCreateForm';
import WorkoutsThisWeek from './WorkoutsThisWeek';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path='/' element={<div><WorkoutButtons /><WorkoutsThisWeek/></div>} />
            <Route exact path='/new' element={<div><CustomSessionCreateForm/><Footer/></div>}/>
            <Route exact path='/Display' element={<div><CustomDispSessionCollection/><Footer/></div>}/>
            <Route exact path='/DispWorkouts/:cid' element={<div><ViewWorkouts/></div>}/>
            <Route exact path ='AddWorkout/:cid' element={<div><AddWorkoutFromDisplay/></div>}/>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;

