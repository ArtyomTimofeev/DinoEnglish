import { useState, useEffect, useRef, useCallback } from 'react';
import { SPEECH_CONFIG } from '@/constants/gameConfig';
import { handleSpeechRecognitionError } from '@/utils/errorHandling';

interface UseSpeechRecognitionReturn {
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  const shouldBeListeningRef = useRef(false); // Track intent to listen
  const restartAttemptsRef = useRef(0); // Track restart attempts to prevent infinite loop
  const maxRestartAttempts = 3;

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  useEffect(() => {
    console.log('useSpeechRecognition useEffect init, isSupported:', isSupported);
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    console.log('SpeechRecognition instance created');

    recognition.lang = SPEECH_CONFIG.lang;
    recognition.continuous = SPEECH_CONFIG.continuous;
    recognition.interimResults = SPEECH_CONFIG.interimResults;
    recognition.maxAlternatives = SPEECH_CONFIG.maxAlternatives;

    recognition.onstart = () => {
      console.log('recognition.onstart fired');
      isListeningRef.current = true;
      setIsListening(true);
      setError(null);
      // Don't reset counter here - onstart fires even when immediately aborted
    };

    recognition.onresult = (event: any) => {
      // Reset restart attempts on successful result
      restartAttemptsRef.current = 0;

      let interimText = '';
      let finalText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcriptText = result[0].transcript;

        if (result.isFinal) {
          finalText += transcriptText;
        } else {
          interimText += transcriptText;
        }
      }

      if (finalText) {
        setTranscript(finalText);
        setInterimTranscript('');
      } else {
        setInterimTranscript(interimText);
      }
    };

    recognition.onerror = (event: any) => {
      console.log('recognition.onerror:', event.error);
      if (event.error === 'aborted') {
        return;
      }
      const errorMessage = handleSpeechRecognitionError(event.error);
      setError(errorMessage);
      isListeningRef.current = false;
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log('recognition.onend, shouldBeListening:', shouldBeListeningRef.current, 'attempts:', restartAttemptsRef.current);
      isListeningRef.current = false;
      setIsListening(false);

      // Auto-restart if we should still be listening (with attempt limit)
      if (shouldBeListeningRef.current && restartAttemptsRef.current < maxRestartAttempts) {
        restartAttemptsRef.current += 1;
        console.log('Auto-restarting, attempt:', restartAttemptsRef.current);
        setTimeout(() => {
          if (shouldBeListeningRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.log('Auto-restart error:', e);
            }
          }
        }, 100);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      console.log('useSpeechRecognition cleanup');
      shouldBeListeningRef.current = false; // Prevent auto-restart after cleanup
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort(); // Use abort instead of stop
        } catch {
          // Ignore errors on cleanup
        }
      }
    };
  }, [isSupported]);

  const startListening = useCallback(() => {
    console.log('startListening called, isListening:', isListeningRef.current, 'recognition:', !!recognitionRef.current);
    shouldBeListeningRef.current = true;
    restartAttemptsRef.current = 0;
    if (recognitionRef.current && !isListeningRef.current) {
      try {
        setTranscript('');
        setInterimTranscript('');
        setError(null);
        recognitionRef.current.start();
        console.log('recognition.start() called');
      } catch (e) {
        console.log('startListening error:', e);
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    shouldBeListeningRef.current = false;
    if (recognitionRef.current && isListeningRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped, ignore
      }
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    transcript,
    interimTranscript,
    isListening,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  };
};
