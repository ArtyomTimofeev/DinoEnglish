import { useState, useEffect } from 'react';
import type { BeforeInstallPromptEvent, PWAInstallState } from '@/types/pwa.types';

interface UsePWAReturn extends PWAInstallState {
  promptInstall: () => Promise<void>;
  dismissPrompt: () => void;
}

export const usePWA = (): UsePWAReturn => {
  const [installState, setInstallState] = useState<PWAInstallState>({
    isInstallable: false,
    isInstalled: false,
    deferredPrompt: null,
  });

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setInstallState((prev) => ({ ...prev, isInstalled: true }));
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;

      setInstallState((prev) => ({
        ...prev,
        isInstallable: true,
        deferredPrompt: promptEvent,
      }));
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setInstallState((prev) => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
        deferredPrompt: null,
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!installState.deferredPrompt) {
      return;
    }

    installState.deferredPrompt.prompt();
    const { outcome } = await installState.deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setInstallState((prev) => ({
        ...prev,
        isInstallable: false,
        deferredPrompt: null,
      }));
    }
  };

  const dismissPrompt = () => {
    setInstallState((prev) => ({
      ...prev,
      isInstallable: false,
      deferredPrompt: null,
    }));
  };

  return {
    ...installState,
    promptInstall,
    dismissPrompt,
  };
};
