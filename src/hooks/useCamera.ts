import { useState, useEffect, useRef } from 'react';
import { CAMERA_CONFIG } from '@/constants/gameConfig';
import { CameraError, handlePermissionError } from '@/utils/errorHandling';

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  isLoading: boolean;
  error: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  hasPermission: boolean;
}

export const useCamera = (): UseCameraReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new CameraError('Camera API not supported in this browser');
      }

      // Request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia(CAMERA_CONFIG);

      setStream(mediaStream);
      setHasPermission(true);

      // Attach stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      const errorMessage = err instanceof DOMException
        ? handlePermissionError(err)
        : 'Failed to access camera';
      setError(errorMessage);
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    stream,
    isLoading,
    error,
    startCamera,
    stopCamera,
    hasPermission,
  };
};
