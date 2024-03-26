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
import SignUp from './SignUp';
import Login from './LogIn';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { SignIn } from '@clerk/clerk-react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSmRYm7asLGxvMgp9yqJqP4GmpwlNY5SM",
  authDomain: "workouttracker-f0e30.firebaseapp.com",
  projectId: "workouttracker-f0e30",
  storageBucket: "workouttracker-f0e30.appspot.com",
  messagingSenderId: "707294832949",
  appId: "1:707294832949:web:64d2bbd2411c7e3b9cc47c",
  measurementId: "G-7NS1GPP2YZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


Amplify.configure(config);




function App( signOut ) {
  return (
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path='/' element={<div><WorkoutButtons /><WorkoutsThisWeek/><Footer/></div>} />
            <Route exact path='/new' element={<div><CustomSessionCreateForm/><Footer/></div>}/>
            <Route exact path='/Display' element={<div><CustomDispSessionCollection/><Footer/></div>}/>
            <Route exact path='/DispWorkouts/:cid' element={<div><ViewWorkouts/><Footer/></div>}/>
            <Route exact path ='AddWorkout/:cid' element={<div><AddWorkoutFromDisplay/><Footer/></div>}/>
            <Route exact path ='/Login' element={<div><Login/></div>}/>
            <Route exact path ='/SignUp' element={<div><SignUp/></div>}/>
          </Routes>
        </Router>
      </header>
  );
}

export default App;
