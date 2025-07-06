/**
 * ButtonSound.jsx - Interactive Button with Audio Feedback
 * 
 * A delightful button component that plays satisfying sounds on interaction:
 * - Hover sound for gentle feedback
 * - Click sound for confirmation
 * - Smooth animations and transitions
 
 */

import React from 'react';
import hoverSound from '../assets/sounds/sound_ex_machina_Button_Tick.mp3';
import clickSound from '../assets/sounds/mixkit-message-pop-alert-2354.mp3';

const ButtonSound = ({ onClick, children, className = '', ...props }) => {
  const playHover = () => {
    const audio = new Audio(hoverSound);
    audio.volume = 0.05;
    audio.play().catch(e => console.log('Hover sound failed:', e));
  };
  
  const playClick = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.1;
    audio.play().catch(e => console.log('Click sound failed:', e));
  };
  
  const handleClick = (e) => {
    playClick();
    if (onClick) onClick(e);
  };
  
  return (
    <button
      onClick={handleClick}
      onMouseEnter={playHover}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonSound;