import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GAME_CONFIG } from '@/constants/gameConfig';

interface CountdownTimerProps {
  isActive: boolean;
  onTimeout: () => void;
  onTick?: (remaining: number) => void;
  reset: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  isActive,
  onTimeout,
  onTick,
  reset,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(GAME_CONFIG.countdownDuration);
  const timeoutCalledRef = useRef(false);
  const onTimeoutRef = useRef(onTimeout);

  // Keep onTimeout ref updated
  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    if (reset) {
      setTimeRemaining(GAME_CONFIG.countdownDuration);
      timeoutCalledRef.current = false;
    }
  }, [reset]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 100;

        if (onTick) {
          onTick(newTime);
        }

        if (newTime <= 0 && !timeoutCalledRef.current) {
          timeoutCalledRef.current = true;
          clearInterval(interval);
          // Use setTimeout to avoid calling during render
          setTimeout(() => {
            onTimeoutRef.current();
          }, 0);
          return 0;
        }

        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, onTick]);

  const percentage = (timeRemaining / GAME_CONFIG.countdownDuration) * 100;
  const seconds = Math.ceil(timeRemaining / 1000);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '24px'
    }}>
      <div style={{ position: 'relative', width: '128px', height: '128px' }}>
        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="56"
            stroke={seconds <= 2 ? '#ef4444' : '#10b981'}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 56}
            strokeDashoffset={2 * Math.PI * 56 * (1 - percentage / 100)}
            transition={{ duration: 0.1 }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
          }}
        >
          {seconds}
        </div>
      </div>
    </div>
  );
};
