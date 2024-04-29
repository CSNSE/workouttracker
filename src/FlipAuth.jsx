import React, { useState } from 'react';
import styles from './Auth.module.css';
import Login from './LogIn';
import SignUp from './SignUp';

function FlipCard() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardSwitch}>
        <label className={styles.switch}>
          <input type="checkbox" className={styles.toggle} checked={isToggled} onChange={() => setIsToggled(!isToggled)} />
          <span className={styles.slider}></span>
        </label>
        <div className={styles.flipCardInner} style={{ transform: isToggled ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className={styles.flipCardFront}>
            <Login />
          </div>
          <div className={styles.flipCardBack}>
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
