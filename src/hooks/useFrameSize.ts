import { useState, useEffect, useMemo } from 'react';

interface FrameSize {
  width: number;
  height: number;
  isMobile: boolean;
  scale: number;
}

const ASPECT_RATIO = 9 / 16;
const MOBILE_BREAKPOINT = 768;
const MOBILE_PADDING = 16;
const DESKTOP_PADDING = 32;
const MAX_DESKTOP_WIDTH = 450;
const BASE_DESIGN_WIDTH = 450; // Базовый размер для которого разрабатывался дизайн

export function useFrameSize(): FrameSize {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return useMemo(() => {
    const { width: windowWidth, height: windowHeight } = windowSize;
    const isMobile = windowWidth < MOBILE_BREAKPOINT;
    const padding = isMobile ? MOBILE_PADDING : DESKTOP_PADDING;

    // Доступное пространство
    const availableWidth = windowWidth - padding * 2;
    const availableHeight = windowHeight - padding * 2;

    // Рассчитываем размер с учётом соотношения 9:16
    let frameWidth: number;
    let frameHeight: number;

    // Сначала пробуем занять всю высоту
    frameHeight = availableHeight;
    frameWidth = frameHeight * ASPECT_RATIO;

    // Если не помещается по ширине - считаем от ширины
    if (frameWidth > availableWidth) {
      frameWidth = availableWidth;
      frameHeight = frameWidth / ASPECT_RATIO;
    }

    // На десктопе ограничиваем максимальную ширину
    if (!isMobile && frameWidth > MAX_DESKTOP_WIDTH) {
      frameWidth = MAX_DESKTOP_WIDTH;
      frameHeight = frameWidth / ASPECT_RATIO;
    }

    // Коэффициент масштабирования для контента
    const scale = frameWidth / BASE_DESIGN_WIDTH;

    return {
      width: Math.round(frameWidth),
      height: Math.round(frameHeight),
      isMobile,
      scale,
    };
  }, [windowSize]);
}
