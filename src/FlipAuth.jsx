import React, { useState, useEffect } from 'react';
import styles from './Auth.module.css';
import Login from './LogIn';
import SignUp from './SignUp';

function FlipCard() {
  const [isToggled, setIsToggled] = useState(() => {
    const savedToggleState = localStorage.getItem('toggleState');
    return savedToggleState ? JSON.parse(savedToggleState) : false;
  });

  useEffect(() => {
    localStorage.setItem('toggleState', JSON.stringify(isToggled));
  }, [isToggled]);

  const toggleText = isToggled ? "Already have an account? Log in" : "Need an account? Sign up";

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardSwitch}>
        <label className={styles.switch}>
          <input type="checkbox" className={styles.toggle} checked={isToggled} onChange={() => setIsToggled(!isToggled)} />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.toggleInstruction}>{toggleText}</span>
      </div>
      <div className={styles.flipCardInner} style={{ transform: isToggled ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div className={styles.flipCardFront}>
          <Login />
        </div>
        <div className={styles.flipCardBack}>
          <SignUp />
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
