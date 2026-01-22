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
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = SPEECH_CONFIG.lang;
    recognition.continuous = SPEECH_CONFIG.continuous;
    recognition.interimResults = SPEECH_CONFIG.interimResults;
    recognition.maxAlternatives = SPEECH_CONFIG.maxAlternatives;

    recognition.onstart = () => {
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
      if (event.error === 'aborted') {
        return;
      }
      const errorMessage = handleSpeechRecognitionError(event.error);
      setError(errorMessage);
      isListeningRef.current = false;
      setIsListening(false);
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      setIsListening(false);

      // Auto-restart if we should still be listening (with attempt limit)
      if (shouldBeListeningRef.current && restartAttemptsRef.current < maxRestartAttempts) {
        restartAttemptsRef.current += 1;
        setTimeout(() => {
          if (shouldBeListeningRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch {
              // Ignore auto-restart errors
            }
          }
        }, 100);
      }
    };

    recognitionRef.current = recognition;

    return () => {
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
    shouldBeListeningRef.current = true;
    restartAttemptsRef.current = 0;

    if (!recognitionRef.current) return;

    // Если уже слушаем, сначала остановим и перезапустим
    if (isListeningRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
      // onend callback перезапустит recognition через auto-restart
      return;
    }

    try {
      setTranscript('');
      setInterimTranscript('');
      setError(null);
      recognitionRef.current.start();
    } catch {
      // Ignore start errors
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
