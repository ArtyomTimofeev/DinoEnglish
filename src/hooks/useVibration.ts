import { useCallback } from 'react';

interface UseVibrationReturn {
  vibrate: (pattern: number | number[]) => void;
  vibrateSuccess: () => void;
  vibrateError: () => void;
  isSupported: boolean;
}

export const useVibration = (): UseVibrationReturn => {
  const isSupported = 'vibrate' in navigator;

  const vibrate = useCallback(
    (pattern: number | number[]) => {
      if (isSupported) {
        navigator.vibrate(pattern);
      }
    },
    [isSupported]
  );

  const vibrateSuccess = useCallback(() => {
    vibrate([50, 50, 50]); // Three short vibrations
  }, [vibrate]);

  const vibrateError = useCallback(() => {
    vibrate([200]); // One long vibration
  }, [vibrate]);

  return {
    vibrate,
    vibrateSuccess,
    vibrateError,
    isSupported,
  };
};
