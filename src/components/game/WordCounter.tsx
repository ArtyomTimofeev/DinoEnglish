import React from 'react';

interface WordCounterProps {
  current: number;
  total: number;
}

export const WordCounter: React.FC<WordCounterProps> = ({ current, total }) => {
  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '8px 16px',
      borderRadius: '9999px'
    }}>
      <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
        {current} / {total}
      </span>
    </div>
  );
};
