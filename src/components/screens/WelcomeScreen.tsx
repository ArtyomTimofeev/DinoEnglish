import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { usePWA } from '@/hooks/usePWA';

interface WelcomeScreenProps {
  onStart: () => void;
  onError: (error: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onError }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const { isInstallable, promptInstall } = usePWA();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startPreview = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraReady(true);
        }
      } catch {
        // Camera not available yet, will request on start
      }
    };
    startPreview();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleStart = async () => {
    setIsRequesting(true);

    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStream.getTracks().forEach(track => track.stop());

      if (!cameraReady) {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraStream.getTracks().forEach(track => track.stop());
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      onStart();
    } catch (err) {
      const error = err as DOMException;
      onError(error.message);
      setIsRequesting(false);
    }
  };

  // Calculate width from height to maintain 9:16 aspect ratio
  const frameHeight = '80vh';
  const frameWidth = 'calc(80vh * 9 / 16)';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '5vh',
      backgroundColor: '#0f172a'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '0 16px'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'relative',
            backgroundColor: 'black',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            width: frameWidth,
            maxWidth: '400px',
            height: frameHeight,
            border: '8px solid #334155',
            borderRadius: '2.5rem'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)'
            }}
          />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent, rgba(0,0,0,0.5))'
          }} />

          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '8px',
                textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
              }}>
                DinoEnglish
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(255,255,255,0.9)',
                textShadow: '1px 1px 4px rgba(0,0,0,0.6)'
              }}>
                Master English Through Voice
              </p>
            </motion.div>

            {!cameraReady && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop: '32px',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                  textAlign: 'center'
                }}
              >
                Camera preview loading...
              </motion.div>
            )}
          </div>

          <div style={{
            display: 'none',
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '96px',
            height: '24px',
            backgroundColor: '#334155',
            borderRadius: '9999px'
          }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Button onClick={handleStart} disabled={isRequesting}>
            {isRequesting ? 'Requesting Permissions...' : 'Start Game'}
          </Button>

          {isInstallable && (
            <Button onClick={promptInstall} variant="secondary">
              Install App
            </Button>
          )}

          <p style={{
            fontSize: '12px',
            color: '#64748b',
            marginTop: '8px',
            textAlign: 'center'
          }}>
            Requires camera and microphone access
          </p>
        </motion.div>
      </div>
    </div>
  );
};
