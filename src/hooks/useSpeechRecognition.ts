import { useState, useEffect, useRef, useCallback } from 'react';
import { SPEECH_CONFIG } from '@/constants/gameConfig';
import { handleSpeechRecognitionError } from '@/utils/errorHandling';

interface UseSpeechRecognitionReturn {
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  isAcceptingInput: boolean;
  error: string | null;
  startSession: () => void;
  endSession: () => void;
  pauseInput: () => void;
  resumeInput: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAcceptingInput, setIsAcceptingInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  const sessionActiveRef = useRef(false);
  const isAcceptingInputRef = useRef(false);

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
    };

    recognition.onresult = (event: any) => {
      // Игнорируем результаты если не принимаем ввод
      if (!isAcceptingInputRef.current) {
        return;
      }

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

      // Авто-рестарт только если сессия активна (игра не закончена)
      if (sessionActiveRef.current) {
        setTimeout(() => {
          if (sessionActiveRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch {
              // Игнорируем ошибки перезапуска
            }
          }
        }, 100);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      sessionActiveRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore errors on cleanup
        }
      }
    };
  }, [isSupported]);

  const startSession = useCallback(() => {
    if (!recognitionRef.current || sessionActiveRef.current) return;

    sessionActiveRef.current = true;
    setTranscript('');
    setInterimTranscript('');
    setError(null);

    try {
      recognitionRef.current.start();
    } catch {
      // Ignore start errors
    }
  }, []);

  const endSession = useCallback(() => {
    sessionActiveRef.current = false;
    isAcceptingInputRef.current = false;
    setIsAcceptingInput(false);

    if (recognitionRef.current && isListeningRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped, ignore
      }
    }
  }, []);

  const pauseInput = useCallback(() => {
    isAcceptingInputRef.current = false;
    setIsAcceptingInput(false);
  }, []);

  const resumeInput = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    isAcceptingInputRef.current = true;
    setIsAcceptingInput(true);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    transcript,
    interimTranscript,
    isListening,
    isAcceptingInput,
    error,
    startSession,
    endSession,
    pauseInput,
    resumeInput,
    resetTranscript,
    isSupported,
  };
};
