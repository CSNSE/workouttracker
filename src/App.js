import React from 'react';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import './App.css';
import WorkoutButtons from './Workoutbuttons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewWorkouts from './ViewWorkouts';
import AddWorkoutFromDisplay from './AddWorkoutFromDisplay';
import CustomDispSessionCollection from './CustomDispSessionsCollection';
import Footer from './Footer';
import CustomSessionCreateForm from './CustomSessionCreateForm';
import WorkoutsThisWeek from './WorkoutsThisWeek';
import {
  withAuthenticator,
  AmplifyTheme,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
Amplify.configure(config);



function App( signOut ) {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path='/' element={<div><WorkoutButtons /><WorkoutsThisWeek/><Footer/></div>} />
            <Route exact path='/new' element={<div><CustomSessionCreateForm/><Footer/></div>}/>
            <Route exact path='/Display' element={<div><CustomDispSessionCollection/><Footer/></div>}/>
            <Route exact path='/DispWorkouts/:cid' element={<div><ViewWorkouts/><Footer/></div>}/>
            <Route exact path ='AddWorkout/:cid' element={<div><AddWorkoutFromDisplay/><Footer/></div>}/>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default withAuthenticator(App);

