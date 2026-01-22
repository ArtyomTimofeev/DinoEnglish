import { useEffect } from 'react';
import { useCamera } from '@/hooks/useCamera';

interface CameraProps {
  onPermissionGranted?: () => void;
  onError?: (error: string) => void;
}

export const Camera: React.FC<CameraProps> = ({
  onPermissionGranted,
  onError,
}) => {
  const { videoRef, error, startCamera, hasPermission } = useCamera();

  useEffect(() => {
    startCamera();
  }, []);

  useEffect(() => {
    if (hasPermission && onPermissionGranted) {
      onPermissionGranted();
    }
  }, [hasPermission, onPermissionGranted]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  return (
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
        transform: 'scaleX(-1)',
        objectPosition: 'center center',
      }}
    />
  );
};
