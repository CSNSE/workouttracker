import React, { useEffect } from 'react';
import './App.css';
import WorkoutButtons from './Workoutbuttons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewWorkouts from './ViewWorkouts';
import AddWorkoutFromDisplay from './AddWorkoutFromDisplay';
import CustomDispSessionCollection from './CustomDispSessionsCollection';
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
import SideNavBar from './SideNavBar';
import DispMyFeed from './DispMyFeed';
import PublishSession from './PublishSession';
import ChangeUsername from './ChangeUsername';
import ChangeFirstName from './ChangeFirstName';
import ChangeProfilePicture from './ChangeProfilePicture';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
const auth = getAuth(app);
function App() {
  return (
      <header className="App-header">
        <Router>
          <Routes>
            <Route path='/' element={<div><WorkoutButtons /><WorkoutsThisWeek/><SideNavBar/><CheckAuth/></div>} />
            <Route path='/new' element={<div><CustomSessionCreateForm/><SideNavBar/><CheckAuth/></div>} />
            <Route path='/display' element={<div><CustomDispSessionCollection/><SideNavBar/><CheckAuth/></div>} />
            <Route path='/DispWorkouts/:cid' element={<div><ViewWorkouts/><SideNavBar/><CheckAuth/></div>} />
            <Route path='AddWorkout/:cid' element={<div><AddWorkoutFromDisplay/><SideNavBar/><CheckAuth/></div>} />
            <Route path='/Login' element={<div><Login/></div>} />
            <Route path='/SignUp' element={<div><SignUp/></div>} />
            <Route path='/Profile' element={<div><ProfilePage/><CheckAuth/><SideNavBar/></div>} />
            <Route path='/Onboarding' element={<div><Onboarding/></div>} />
            <Route path='/Forgot-Password' element={<div><ForgotPassword/></div>} />
            <Route path='/verify' element={<div><Verify/></div>} />
            <Route path='/Settings' element={<div><Settings/><CheckAuth/><SideNavBar/></div>} />
            <Route path='/Progress' element={<div><Progress/><SideNavBar/><CheckAuth/></div>} />
            <Route path="*" element={<NotFoundPage/>} />
            <Route path='/MyFeed' element={<div><SideNavBar/><DispMyFeed/><CheckAuth/></div>} />
            <Route path='/PublishSession/:cid' element={<div><SideNavBar/><PublishSession/><CheckAuth/></div>}/>
            <Route path='/ChangeUsername' element={<div><ChangeUsername/><SideNavBar/><CheckAuth/></div>}/>
            <Route path='/ChangeFirstName' element={<div><ChangeFirstName/><SideNavBar/><CheckAuth/></div>}/>
            <Route path='/ChangeProfilePicture' element={<div><ChangeProfilePicture/><SideNavBar/><CheckAuth/></div>}/>
            <Route path='/ChangeEmail' element={<div><ChangeEmail/><SideNavBar/><CheckAuth/></div>}/>
            <Route path='/ChangePassword' element={<div><ChangePassword/><SideNavBar/><CheckAuth/></div>}/>
          </Routes>
        </Router>
      </header>
  );
}


export default App;
