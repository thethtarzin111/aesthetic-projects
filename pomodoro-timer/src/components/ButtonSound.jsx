import React from 'react';
import useSound from '../hooks/useSound';

const ButtonSound = ({ onClick, children, className = '', ...props }) => {
  const playHover = useSound('/sounds/sound_ex_machina_Button_Tick.mp3', 0.05);
  const playClick = useSound('/sounds/mixkit-message-pop-alert-2354.mp3', 0.1);

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
