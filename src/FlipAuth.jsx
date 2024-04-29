import React, { useState } from 'react';
import styles from './Auth.module.css';
import Login from './LogIn';
import SignUp from './SignUp';


function FlipCard() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(prev => !prev); // Toggle the state to flip back and forth
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.switch}>
        <input 
          type="checkbox" 
          className={styles.toggle} 
          checked={isToggled}
          onChange={handleToggle}
        />
        <span className={styles.slider}></span>
        <div className={styles.flipCardInner} style={{ transform: isToggled ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className={styles.flipCardFront}>
            <div className={styles.title}>Log in</div>
                <Login/>
          </div>
          <div className={styles.flipCardBack}>
            <div className={styles.title}>Sign up</div>
                <SignUp/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
