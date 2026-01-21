import React from 'react';
import { motion } from 'framer-motion';

interface PixelButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'red' | 'green';
}

const VARIANT_COLORS = {
  red: '#ef4444',
  green: '#22c55e',
};

export const PixelButton: React.FC<PixelButtonProps> = ({
  onClick,
  children,
  disabled = false,
  variant = 'red',
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { y: 2 } : {}}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '86px',
        height: '40px',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        border: '3px solid #1a1a1a',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        backgroundColor: VARIANT_COLORS[variant],
        color: '#ffffff',
        textShadow: '1px 1px 0 #000',
        boxShadow: '3px 3px 0 #1a1a1a',
        imageRendering: 'pixelated',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}
    >
      {children}
    </motion.button>
  );
};
