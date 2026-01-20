import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '16px 32px',
        borderRadius: '9999px',
        fontSize: '18px',
        fontWeight: 'bold',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        backgroundColor: variant === 'primary' ? '#2563eb' : '#e5e7eb',
        color: variant === 'primary' ? '#ffffff' : '#1f2937',
      }}
    >
      {children}
    </motion.button>
  );
};
