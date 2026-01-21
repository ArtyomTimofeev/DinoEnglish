import React from 'react';
import type { AnimalType } from '../types';

interface AnimalSpriteProps {
  type: AnimalType;
  scale: number;
}

const animalGifs: Record<AnimalType, string> = {
  crab: '/sprites/animals/CoralCrab.gif',
  pig: '/sprites/animals/DaintyPig.gif',
  skunk: '/sprites/animals/StinkySkunk.gif',
  monkey: '/sprites/animals/CuriousMonkey.gif',
  eagle: '/sprites/animals/BaldEagle.gif',
  wolf: '/sprites/animals/TimberWolf.gif',
  kangaroo: '/sprites/animals/HoppingKangaroo.gif',
  cow: '/sprites/animals/GrazingCow.gif',
  orangutan: '/sprites/animals/AgitatedOrangutan.gif',
  buffalo: '/sprites/animals/EnragedBuffalo.gif',
  caveBear: '/sprites/animals/CaveBear.gif',
  elephant: '/sprites/animals/StompingElephant.gif',
};

export const AnimalSprite: React.FC<AnimalSpriteProps> = ({ type, scale }) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      <img
        src={animalGifs[type]}
        alt={type}
        style={{
          width: '32px',
          height: '32px',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};
