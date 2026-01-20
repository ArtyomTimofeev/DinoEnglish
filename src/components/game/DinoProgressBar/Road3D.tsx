import React from 'react';

interface Road3DProps {
  isMoving?: boolean;
}

export const Road3D: React.FC<Road3DProps> = ({ isMoving = true }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        height: '15%',
        overflow: 'hidden',
      }}
    >
      {/* Two road images side by side for seamless scrolling */}
      <div
        style={{
          display: 'flex',
          width: '200%',
          height: '100%',
          animation: isMoving ? 'roadScroll 1.3s linear infinite' : 'none',
        }}
      >
        <img
          src="/sprites/road.png"
          alt=""
          style={{
            width: '50%',
            height: '100%',
            objectFit: 'cover',
            imageRendering: 'pixelated',
          }}
        />
        <img
          src="/sprites/road.png"
          alt=""
          style={{
            width: '50%',
            height: '100%',
            objectFit: 'cover',
            imageRendering: 'pixelated',
          }}
        />
      </div>

      <style>
        {`
          @keyframes roadScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};
