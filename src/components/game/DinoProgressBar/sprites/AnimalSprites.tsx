import React from 'react';
import type { AnimalType } from '../types';

interface AnimalSpriteProps {
  type: AnimalType;
  scale: number;
}

const Hedgehog: React.FC = () => (
  <svg width="32" height="24" viewBox="0 0 32 24" style={{ shapeRendering: 'crispEdges' }}>
    {/* Body */}
    <rect x="8" y="12" width="16" height="8" fill="#8B7355" />
    {/* Spikes */}
    <rect x="12" y="8" width="4" height="4" fill="#5C4033" />
    <rect x="18" y="8" width="4" height="4" fill="#5C4033" />
    <rect x="15" y="4" width="4" height="4" fill="#5C4033" />
    {/* Head */}
    <rect x="4" y="12" width="6" height="6" fill="#D2B48C" />
    {/* Eye */}
    <rect x="6" y="14" width="2" height="2" fill="black" />
    {/* Nose */}
    <rect x="4" y="16" width="2" height="2" fill="#333" />
    {/* Legs */}
    <rect x="10" y="20" width="4" height="4" fill="#8B7355" />
    <rect x="18" y="20" width="4" height="4" fill="#8B7355" />
  </svg>
);

const Mouse: React.FC = () => (
  <svg width="32" height="28" viewBox="0 0 32 28" style={{ shapeRendering: 'crispEdges' }}>
    {/* Body */}
    <rect x="10" y="14" width="14" height="8" fill="#A0A0A0" />
    {/* Head */}
    <rect x="4" y="12" width="8" height="8" fill="#A0A0A0" />
    {/* Ears */}
    <rect x="4" y="6" width="4" height="6" fill="#FFB6C1" />
    <rect x="10" y="6" width="4" height="6" fill="#FFB6C1" />
    {/* Eye */}
    <rect x="6" y="14" width="2" height="2" fill="black" />
    {/* Nose */}
    <rect x="4" y="16" width="2" height="2" fill="#FF69B4" />
    {/* Tail */}
    <rect x="24" y="18" width="8" height="2" fill="#A0A0A0" />
    {/* Legs */}
    <rect x="12" y="22" width="4" height="6" fill="#A0A0A0" />
    <rect x="18" y="22" width="4" height="6" fill="#A0A0A0" />
  </svg>
);

const Rabbit: React.FC = () => (
  <svg width="32" height="36" viewBox="0 0 32 36" style={{ shapeRendering: 'crispEdges' }}>
    {/* Body */}
    <rect x="8" y="18" width="16" height="12" fill="#E8E8E8" />
    {/* Head */}
    <rect x="4" y="14" width="10" height="10" fill="#E8E8E8" />
    {/* Ears */}
    <rect x="4" y="2" width="4" height="12" fill="#E8E8E8" />
    <rect x="5" y="4" width="2" height="8" fill="#FFB6C1" />
    <rect x="10" y="2" width="4" height="12" fill="#E8E8E8" />
    <rect x="11" y="4" width="2" height="8" fill="#FFB6C1" />
    {/* Eye */}
    <rect x="6" y="16" width="2" height="2" fill="black" />
    {/* Nose */}
    <rect x="4" y="20" width="2" height="2" fill="#FF69B4" />
    {/* Tail */}
    <rect x="24" y="22" width="4" height="4" fill="#E8E8E8" />
    {/* Legs */}
    <rect x="10" y="30" width="4" height="6" fill="#E8E8E8" />
    <rect x="18" y="30" width="4" height="6" fill="#E8E8E8" />
  </svg>
);

const Fox: React.FC = () => (
  <svg width="40" height="32" viewBox="0 0 40 32" style={{ shapeRendering: 'crispEdges' }}>
    {/* Body */}
    <rect x="12" y="14" width="18" height="10" fill="#D2691E" />
    {/* Head */}
    <rect x="4" y="10" width="12" height="12" fill="#D2691E" />
    {/* Snout */}
    <rect x="0" y="14" width="6" height="6" fill="#FFE4C4" />
    {/* Ears */}
    <rect x="4" y="4" width="4" height="6" fill="#D2691E" />
    <rect x="10" y="4" width="4" height="6" fill="#D2691E" />
    {/* Eye */}
    <rect x="8" y="12" width="2" height="2" fill="black" />
    {/* Nose */}
    <rect x="0" y="16" width="2" height="2" fill="black" />
    {/* Tail */}
    <rect x="30" y="12" width="6" height="4" fill="#D2691E" />
    <rect x="36" y="10" width="4" height="4" fill="#FFE4C4" />
    {/* Legs */}
    <rect x="14" y="24" width="4" height="8" fill="#D2691E" />
    <rect x="24" y="24" width="4" height="8" fill="#D2691E" />
  </svg>
);

const Dog: React.FC = () => (
  <svg width="44" height="36" viewBox="0 0 44 36" style={{ shapeRendering: 'crispEdges' }}>
    {/* Body */}
    <rect x="14" y="14" width="20" height="12" fill="#8B4513" />
    {/* Head */}
    <rect x="4" y="10" width="14" height="14" fill="#8B4513" />
    {/* Snout */}
    <rect x="0" y="16" width="6" height="6" fill="#D2B48C" />
    {/* Ears */}
    <rect x="4" y="4" width="4" height="8" fill="#5C4033" />
    <rect x="12" y="4" width="4" height="8" fill="#5C4033" />
    {/* Eye */}
    <rect x="8" y="14" width="3" height="3" fill="black" />
    {/* Nose */}
    <rect x="0" y="18" width="3" height="3" fill="black" />
    {/* Tail */}
    <rect x="34" y="10" width="4" height="8" fill="#8B4513" />
    <rect x="38" y="6" width="4" height="6" fill="#8B4513" />
    {/* Legs */}
    <rect x="16" y="26" width="5" height="10" fill="#8B4513" />
    <rect x="26" y="26" width="5" height="10" fill="#8B4513" />
  </svg>
);

const Deer: React.FC = () => (
  <svg width="48" height="44" viewBox="0 0 48 44" style={{ shapeRendering: 'crispEdges' }}>
    {/* Body */}
    <rect x="14" y="20" width="22" height="12" fill="#CD853F" />
    {/* Head */}
    <rect x="4" y="16" width="12" height="12" fill="#CD853F" />
    {/* Snout */}
    <rect x="0" y="20" width="6" height="6" fill="#DEB887" />
    {/* Antlers */}
    <rect x="6" y="8" width="2" height="8" fill="#8B4513" />
    <rect x="2" y="4" width="4" height="4" fill="#8B4513" />
    <rect x="12" y="8" width="2" height="8" fill="#8B4513" />
    <rect x="14" y="4" width="4" height="4" fill="#8B4513" />
    {/* Eye */}
    <rect x="8" y="18" width="2" height="2" fill="black" />
    {/* Nose */}
    <rect x="0" y="22" width="2" height="2" fill="black" />
    {/* Tail */}
    <rect x="36" y="20" width="4" height="6" fill="#DEB887" />
    {/* Legs */}
    <rect x="16" y="32" width="4" height="12" fill="#CD853F" />
    <rect x="30" y="32" width="4" height="12" fill="#CD853F" />
  </svg>
);

const Horse: React.FC = () => (
  <svg width="52" height="48" viewBox="0 0 52 48" style={{ shapeRendering: 'crispEdges' }}>
    {/* Body */}
    <rect x="14" y="20" width="26" height="14" fill="#8B4513" />
    {/* Head */}
    <rect x="2" y="10" width="14" height="16" fill="#8B4513" />
    {/* Snout */}
    <rect x="0" y="18" width="6" height="8" fill="#D2B48C" />
    {/* Ears */}
    <rect x="4" y="4" width="4" height="6" fill="#8B4513" />
    <rect x="12" y="4" width="4" height="6" fill="#8B4513" />
    {/* Mane */}
    <rect x="8" y="10" width="8" height="4" fill="#3D2817" />
    <rect x="14" y="14" width="4" height="6" fill="#3D2817" />
    {/* Eye */}
    <rect x="6" y="14" width="3" height="3" fill="black" />
    {/* Nose */}
    <rect x="0" y="22" width="2" height="2" fill="black" />
    {/* Tail */}
    <rect x="40" y="18" width="4" height="8" fill="#3D2817" />
    <rect x="44" y="22" width="4" height="12" fill="#3D2817" />
    {/* Legs */}
    <rect x="18" y="34" width="5" height="14" fill="#8B4513" />
    <rect x="32" y="34" width="5" height="14" fill="#8B4513" />
  </svg>
);

const Bear: React.FC = () => (
  <svg width="52" height="44" viewBox="0 0 52 44" style={{ shapeRendering: 'crispEdges' }}>
    {/* Body */}
    <rect x="12" y="16" width="28" height="18" fill="#5C4033" />
    {/* Head */}
    <rect x="2" y="10" width="16" height="16" fill="#5C4033" />
    {/* Snout */}
    <rect x="0" y="18" width="6" height="6" fill="#8B7355" />
    {/* Ears */}
    <rect x="2" y="4" width="6" height="6" fill="#5C4033" />
    <rect x="12" y="4" width="6" height="6" fill="#5C4033" />
    {/* Eye */}
    <rect x="8" y="14" width="3" height="3" fill="black" />
    {/* Nose */}
    <rect x="0" y="20" width="3" height="3" fill="black" />
    {/* Tail */}
    <rect x="40" y="22" width="4" height="4" fill="#5C4033" />
    {/* Legs */}
    <rect x="14" y="34" width="8" height="10" fill="#5C4033" />
    <rect x="30" y="34" width="8" height="10" fill="#5C4033" />
  </svg>
);

const Rhino: React.FC = () => (
  <svg width="56" height="44" viewBox="0 0 56 44" style={{ shapeRendering: 'crispEdges' }}>
    {/* Body */}
    <rect x="16" y="16" width="30" height="16" fill="#808080" />
    {/* Head */}
    <rect x="4" y="12" width="16" height="16" fill="#808080" />
    {/* Horn */}
    <rect x="0" y="8" width="4" height="8" fill="#A9A9A9" />
    <rect x="2" y="4" width="2" height="4" fill="#A9A9A9" />
    {/* Small horn */}
    <rect x="6" y="10" width="2" height="4" fill="#A9A9A9" />
    {/* Ear */}
    <rect x="16" y="8" width="4" height="6" fill="#808080" />
    {/* Eye */}
    <rect x="12" y="16" width="3" height="3" fill="black" />
    {/* Legs */}
    <rect x="20" y="32" width="8" height="12" fill="#808080" />
    <rect x="36" y="32" width="8" height="12" fill="#808080" />
    {/* Tail */}
    <rect x="46" y="20" width="6" height="3" fill="#808080" />
    <rect x="52" y="22" width="4" height="6" fill="#696969" />
  </svg>
);

const Elephant: React.FC = () => (
  <svg width="64" height="52" viewBox="0 0 64 52" style={{ shapeRendering: 'crispEdges' }}>
    {/* Body */}
    <rect x="18" y="16" width="34" height="20" fill="#808080" />
    {/* Head */}
    <rect x="4" y="10" width="20" height="20" fill="#808080" />
    {/* Trunk */}
    <rect x="0" y="20" width="6" height="6" fill="#808080" />
    <rect x="0" y="26" width="4" height="10" fill="#808080" />
    <rect x="0" y="36" width="6" height="4" fill="#808080" />
    {/* Ears */}
    <rect x="20" y="8" width="8" height="16" fill="#696969" />
    {/* Eye */}
    <rect x="10" y="14" width="4" height="4" fill="black" />
    {/* Tusk */}
    <rect x="6" y="26" width="2" height="6" fill="#FFFFF0" />
    {/* Legs */}
    <rect x="22" y="36" width="10" height="16" fill="#808080" />
    <rect x="40" y="36" width="10" height="16" fill="#808080" />
    {/* Tail */}
    <rect x="52" y="20" width="6" height="3" fill="#808080" />
    <rect x="58" y="22" width="4" height="8" fill="#696969" />
  </svg>
);

const animalComponents: Record<AnimalType, React.FC> = {
  hedgehog: Hedgehog,
  mouse: Mouse,
  rabbit: Rabbit,
  fox: Fox,
  dog: Dog,
  deer: Deer,
  horse: Horse,
  bear: Bear,
  rhino: Rhino,
  elephant: Elephant,
};

export const AnimalSprite: React.FC<AnimalSpriteProps> = ({ type, scale }) => {
  const AnimalComponent = animalComponents[type];

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}>
      <AnimalComponent />
    </div>
  );
};
