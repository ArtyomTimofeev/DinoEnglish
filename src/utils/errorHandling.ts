export class CameraError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CameraError';
  }
}

export class MicrophoneError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MicrophoneError';
  }
}

export class SpeechRecognitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SpeechRecognitionError';
  }
}

export const handlePermissionError = (error: DOMException): string => {
  switch (error.name) {
    case 'NotAllowedError':
      return 'Permission denied. Please allow camera and microphone access.';
    case 'NotFoundError':
      return 'No camera or microphone found on this device.';
    case 'NotReadableError':
      return 'Camera or microphone is already in use by another application.';
    case 'OverconstrainedError':
      return 'Camera or microphone constraints could not be satisfied.';
    case 'SecurityError':
      return 'Security error. Please ensure you are using HTTPS.';
    default:
      return `Error accessing media devices: ${error.message}`;
  }
};

export const handleSpeechRecognitionError = (error: string): string => {
  switch (error) {
    case 'no-speech':
      return 'No speech detected. Please try again.';
    case 'audio-capture':
      return 'Microphone not accessible.';
    case 'not-allowed':
      return 'Microphone permission denied.';
    case 'network':
      return 'Network error. Please check your connection.';
    case 'aborted':
      return 'Speech recognition aborted.';
    default:
      return `Speech recognition error: ${error}`;
  }
};
