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
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import CheckAuth from './CheckAuth';
import ProfilePage from './ProfilePage';
import Onboarding from './Onboarding';
import ForgotPassword from './ForgotPassword';
import Verify from './verify';
import Settings from './Settings';

const firebaseConfig = {
  apiKey: "AIzaSyDSmRYm7asLGxvMgp9yqJqP4GmpwlNY5SM",
  authDomain: "workouttracker-f0e30.firebaseapp.com",
  projectId: "workouttracker-f0e30",
  storageBucket: "workouttracker-f0e30.appspot.com",
  messagingSenderId: "707294832949",
  appId: "1:707294832949:web:64d2bbd2411c7e3b9cc47c",
  measurementId: "G-7NS1GPP2YZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  
  return (
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path='/' element={<div><WorkoutButtons /><WorkoutsThisWeek/><Footer/><CheckAuth/></div>} />
            <Route exact path='/new' element={<div><CustomSessionCreateForm/><Footer/><CheckAuth/></div>}/>
            <Route exact path='/Display' element={<div><CustomDispSessionCollection/><Footer/><CheckAuth/></div>}/>
            <Route exact path='/DispWorkouts/:cid' element={<div><ViewWorkouts/><Footer/><CheckAuth/></div>}/>
            <Route exact path ='AddWorkout/:cid' element={<div><AddWorkoutFromDisplay/><Footer/><CheckAuth/></div>}/>
            <Route exact path ='/Login' element={<div><Login/></div>}/>
            <Route exact path ='/SignUp' element={<div><SignUp/></div>}/>
            <Route exact path ='/Profile' element={<div><ProfilePage/></div>}/>
            <Route exact path ='/Onboarding' element={<div><Onboarding/></div>}/>
            <Route exact path ='/Forgot-Password' element={<div><ForgotPassword/></div>}/>
            <Route exact path ='/verify' element={<div><Verify/></div>}/>
            <Route exact path ='/Settings' element={<div><Settings/></div>}/>

          </Routes>
        </Router>
      </header>
  );
}


export default App;
