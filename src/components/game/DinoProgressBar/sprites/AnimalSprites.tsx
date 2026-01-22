import React from 'react';
import type { AnimalType } from '../types';

interface AnimalSpriteProps {
  type: AnimalType;
  scale: number;
}

const base = import.meta.env.BASE_URL;

const animalGifs: Record<AnimalType, string> = {
  crab: `${base}sprites/animals/CoralCrab.gif`,
  pig: `${base}sprites/animals/DaintyPig.gif`,
  skunk: `${base}sprites/animals/StinkySkunk.gif`,
  monkey: `${base}sprites/animals/CuriousMonkey.gif`,
  eagle: `${base}sprites/animals/BaldEagle.gif`,
  wolf: `${base}sprites/animals/TimberWolf.gif`,
  kangaroo: `${base}sprites/animals/HoppingKangaroo.gif`,
  cow: `${base}sprites/animals/GrazingCow.gif`,
  orangutan: `${base}sprites/animals/AgitatedOrangutan.gif`,
  buffalo: `${base}sprites/animals/EnragedBuffalo.gif`,
  caveBear: `${base}sprites/animals/CaveBear.gif`,
  elephant: `${base}sprites/animals/StompingElephant.gif`,
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
