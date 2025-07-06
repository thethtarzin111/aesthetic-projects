import { useCallback } from 'react';

const useSound = (src, volume = 1.0) => {
  const play = useCallback(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play();
  }, [src, volume]);

  return play;
};

export default useSound;
