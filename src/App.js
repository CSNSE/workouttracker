import React, { useEffect } from 'react';
import './App.css';
import WorkoutButtons from './Workoutbuttons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewWorkouts from './ViewWorkouts';
import AddWorkoutFromDisplay from './AddWorkoutFromDisplay';
import CustomDispSessionCollection from './CustomDispSessionsCollection';
import Footer from './Footer';
import CustomSessionCreateForm from './CustomSessionCreateForm';
import WorkoutsThisWeek from './WorkoutsThisWeek';
import SignUp from './SignUp';
import Login from './LogIn';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import CheckAuth from './CheckAuth';
import ProfilePage from './ProfilePage';
import Onboarding from './Onboarding';
import ForgotPassword from './ForgotPassword';
import Verify from './verify';
import Settings from './Settings';
import app from './firebase-config';
import Progress from './Progress';
import NotFoundPage from './NotFoundPage';

const auth = getAuth(app);
function App() {
  return (
      <header className="App-header">
        <Router>
          <Routes>
            <Route path='/' element={<div><WorkoutButtons /><WorkoutsThisWeek/><Footer/><CheckAuth/></div>} />
            <Route path='/new' element={<div><CustomSessionCreateForm/><Footer/><CheckAuth/></div>} />
            <Route path='/display' element={<div><CustomDispSessionCollection/><Footer/><CheckAuth/></div>} />
            <Route path='/DispWorkouts/:cid' element={<div><ViewWorkouts/><Footer/><CheckAuth/></div>} />
            <Route path='AddWorkout/:cid' element={<div><AddWorkoutFromDisplay/><Footer/><CheckAuth/></div>} />
            <Route path='/Login' element={<div><Login/></div>} />
            <Route path='/SignUp' element={<div><SignUp/></div>} />
            <Route path='/Profile' element={<div><ProfilePage/><CheckAuth/><Footer/></div>} />
            <Route path='/Onboarding' element={<div><Onboarding/></div>} />
            <Route path='/Forgot-Password' element={<div><ForgotPassword/></div>} />
            <Route path='/verify' element={<div><Verify/></div>} />
            <Route path='/Settings' element={<div><Settings/><CheckAuth/><Footer/></div>} />
            <Route path='/Progress' element={<div><Progress/><Footer/><CheckAuth/></div>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </Router>
      </header>
  );
}


export default App;
