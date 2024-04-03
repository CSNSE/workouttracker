import { initializeApp } from "firebase/app";

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

export default app;