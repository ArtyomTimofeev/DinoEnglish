import React from 'react';

interface Road3DProps {
  isMoving?: boolean;
  bounceOffset?: number; // проценты смещения (0 или 15)
  animalElement?: React.ReactNode; // Животное для рендера на дороге
}

export const Road3D: React.FC<Road3DProps> = ({
  isMoving = true,
  bounceOffset = 0,
  animalElement
}) => {
  // Road image is 1200x57px - we show the full width
  const roadWidth = 1200;

  // Позиция животного на дороге - в конце первого изображения (80% от ширины)
  const animalPositionOnRoad = roadWidth * 0.8;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '18%',
        left: 0,
        right: 0,
        height: '15%',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Two road images side by side for seamless scrolling */}
      <div
        style={{
          display: 'flex',
          width: roadWidth * 2,
          height: '100%',
          position: 'relative',
          animation: isMoving ? 'roadScroll 8s linear infinite' : 'none',
          // При отскоке добавляем смещение через transform
          transform: bounceOffset > 0 ? `translateX(${bounceOffset}%)` : undefined,
          transition: bounceOffset > 0 ? 'transform 0.25s ease-out' : 'transform 0.3s ease-in-out',
        }}
      >
        <img
          src="/sprites/road.png"
          alt=""
          style={{
            width: roadWidth,
            height: '100%',
            objectFit: 'fill',
            imageRendering: 'pixelated',
          }}
        />
        <img
          src="/sprites/road.png"
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
          @keyframes roadScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${roadWidth}px);
            }
          }
        `}
      </style>
    </div>
  );
};
