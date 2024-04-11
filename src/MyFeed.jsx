import React from 'react';
import './MyFeed.css'; // 
import DispSessionFeed from './DispSessionFeed';
import DispSessionFeedNavBar from './DispSessionFeedNavBar';

const MyFeed = () => (
  <div className="myFeedContainer">
    <div className="myFeedNavBar"><DispSessionFeedNavBar/></div>
    <div className="myFeedContent"><DispSessionFeed/></div>
  </div>
);

export default MyFeed;
