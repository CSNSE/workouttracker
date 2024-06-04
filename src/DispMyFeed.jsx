import React from 'react';
import './DispMyFeed.css'; // 
import DispSessionFeed from './DispSessionFeed';
import DispSessionFeedNavBar from './DispSessionFeedNavBar';
import DispFeedBottomNavBar from './DispFeedBottomNavBar';
const MyFeed = () => (
  <div className="myFeedContainer">
    <div className="myFeedNavBar"><DispSessionFeedNavBar/></div>
    <div className="myFeedContent"><DispSessionFeed/></div>
  </div>
);

export default MyFeed;
