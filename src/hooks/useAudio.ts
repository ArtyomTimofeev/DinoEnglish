import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

interface UseAudioReturn {
  playSuccess: () => void;
  playError: () => void;
  playRocketLaunch: () => void;
  isLoaded: boolean;
}

export const useAudio = (): UseAudioReturn => {
  const [isLoaded, setIsLoaded] = useState(false);
  const successSoundRef = useRef<Howl | null>(null);
  const errorSoundRef = useRef<Howl | null>(null);
  const rocketSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Preload audio files
    successSoundRef.current = new Howl({
      src: ['/sounds/success.mp3'],
      volume: 0.5,
      preload: true,
    });

    errorSoundRef.current = new Howl({
      src: ['/sounds/error.mp3'],
      volume: 0.5,
      preload: true,
    });

    rocketSoundRef.current = new Howl({
      src: ['/sounds/rocket-launch.mp3'],
      volume: 0.3,
      preload: true,
    });

    // Check if all sounds are loaded
    const checkLoaded = () => {
      if (
        successSoundRef.current?.state() === 'loaded' &&
        errorSoundRef.current?.state() === 'loaded' &&
        rocketSoundRef.current?.state() === 'loaded'
      ) {
        setIsLoaded(true);
      }
    };

    successSoundRef.current.on('load', checkLoaded);
    errorSoundRef.current.on('load', checkLoaded);
    rocketSoundRef.current.on('load', checkLoaded);

    return () => {
      successSoundRef.current?.unload();
      errorSoundRef.current?.unload();
      rocketSoundRef.current?.unload();
    };
  }, []);

  const playSuccess = () => {
    successSoundRef.current?.play();
  };

  const playError = () => {
    errorSoundRef.current?.play();
  };

  const playRocketLaunch = () => {
    rocketSoundRef.current?.play();
  };

  return {
    playSuccess,
    playError,
    playRocketLaunch,
    isLoaded,
  };
};
