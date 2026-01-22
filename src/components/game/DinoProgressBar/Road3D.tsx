import React, { useState } from 'react';

const base = import.meta.env.BASE_URL;

interface Road3DProps {
  isMoving?: boolean;
  bounceOffset?: number; // проценты смещения (0 или 15)
  animalElement?: React.ReactNode; // Животное для рендера на дороге
}

// User-friendly offset: positive = shift road right (show end of road on left)
const USER_OFFSET = 240;

export const Road3D: React.FC<Road3DProps> = ({
  isMoving = true,
  bounceOffset = 0,
  animalElement,
}) => {
  // Unique key for CSS animation to ensure it restarts on remount
  const [animationKey] = useState(() => Date.now());

  // Road image is 1200x57px - we show the full width
  const roadWidth = 1200;

  // Convert user offset to actual translateX value
  // Base position is -roadWidth so we're centered on the middle image
  const actualOffset = -roadWidth + USER_OFFSET;

  // Позиция животного на дороге - в конце первого изображения (80% от ширины)
  const animalPositionOnRoad = roadWidth * 0.8;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '25%',
        left: 0,
        right: 0,
        height: '15%',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Three road images side by side for seamless scrolling with offset */}
      <div
        style={{
          display: 'flex',
          width: roadWidth * 3,
          height: '100%',
          position: 'relative',
          animation: isMoving ? `roadScroll-${animationKey} 8s linear infinite` : 'none',
          // При отскоке добавляем смещение через transform
          // Когда игра не запущена - сдвигаем дорогу на начальную позицию
          transform:
            bounceOffset > 0
              ? `translateX(${bounceOffset}%)`
              : !isMoving
              ? `translateX(${actualOffset}px)`
              : undefined,
          transition:
            bounceOffset > 0
              ? 'transform 0.25s ease-out'
              : 'transform 0.3s ease-in-out',
        }}
      >
        <img
          src={`${base}sprites/road.png`}
          alt=""
          style={{
            width: roadWidth,
            height: '100%',
            objectFit: 'fill',
            imageRendering: 'pixelated',
          }}
        />
        <img
          src={`${base}sprites/road.png`}
          alt=""
          style={{
            width: roadWidth,
            height: '100%',
            objectFit: 'fill',
            imageRendering: 'pixelated',
          }}
        />
        <img
          src={`${base}sprites/road.png`}
          alt=""
          style={{
            width: roadWidth,
            height: '100%',
            objectFit: 'fill',
            imageRendering: 'pixelated',
          }}
        />

        {/* Животное приклеено к дороге */}
        {animalElement && (
          <div
            style={{
              position: 'absolute',
              left: animalPositionOnRoad,
              bottom: '50%',
              transform: 'translateY(50%)',
              zIndex: 10,
            }}
          >
            {animalElement}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes roadScroll-${animationKey} {
            0% {
              transform: translateX(${actualOffset}px);
            }
            100% {
              transform: translateX(${actualOffset - roadWidth}px);
            }
          }
        `}
      </style>
    </div>
  );
};
