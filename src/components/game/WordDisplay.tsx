import React from 'react';
import { motion } from 'framer-motion';
import type { UserLevelResult, GameCEFRLevel } from '@/types/game.types';

interface WordDisplayProps {
  word: string;
  englishWord?: string;
  isShowingEnglish?: boolean;
  isGameActive: boolean;
  isGameComplete: boolean;
  userLevelResult: UserLevelResult | null;
}

const LEVEL_COLORS: Record<string, string> = {
  A0: '#94a3b8',
  A1: '#22c55e',
  A2: '#84cc16',
  B1: '#eab308',
  B2: '#f97316',
  C1: '#ef4444',
  C2: '#a855f7',
};

const GAME_LEVELS: GameCEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const WordDisplay: React.FC<WordDisplayProps> = ({
  word,
  englishWord,
  isShowingEnglish,
  isGameActive,
  isGameComplete,
  userLevelResult,
}) => {
  const getFontSize = (text: string): string => {
    return text.length > 14 ? '1.1rem' : '1.5rem';
  };

  // После игры — таблица результатов
  if (isGameComplete && userLevelResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        {/* Подпись */}
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.6rem',
            color: 'rgba(255, 255, 255, 0.7)',
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.9)',
            marginBottom: '8px',
          }}
        >
          Your level of English:
        </div>

        {/* Достигнутый уровень */}
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '1.2rem',
            color: '#000',
            backgroundColor: LEVEL_COLORS[userLevelResult.achievedLevel],
            padding: '8px 16px',
            borderRadius: '8px',
            border: '3px solid #000',
            display: 'inline-block',
            marginBottom: '16px',
            textShadow: '1px 1px 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          {userLevelResult.isPerfect ? 'PERFECT! ' : ''}
          {userLevelResult.achievedLevel}
        </div>

        {/* Детальная таблица по уровням */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '220px',
            margin: '0 auto',
          }}
        >
          {GAME_LEVELS.map((level) => {
            const result = userLevelResult.levelResults.find(
              (r) => r.level === level
            );
            const correctCount = result?.correctCount ?? 0;
            const totalCount = result?.totalCount ?? 2;
            const isFullyCorrect = correctCount === totalCount;
            const isPartiallyCorrect = correctCount > 0 && correctCount < totalCount;

            return (
              <div
                key={level}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '7px',
                  color: isFullyCorrect ? '#000' : isPartiallyCorrect ? '#000' : 'rgba(255,255,255,0.5)',
                  backgroundColor: isFullyCorrect
                    ? LEVEL_COLORS[level]
                    : isPartiallyCorrect
                    ? `${LEVEL_COLORS[level]}80`
                    : 'rgba(0,0,0,0.3)',
                  padding: '4px 6px',
                  borderRadius: '4px',
                  border: `2px solid ${isFullyCorrect ? '#000' : isPartiallyCorrect ? LEVEL_COLORS[level] : 'rgba(255,255,255,0.2)'}`,
                  whiteSpace: 'nowrap',
                }}
              >
                {level}: {correctCount}/{totalCount}
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // Показать подсказку только до начала игры
  const showHint = !isGameActive && !isGameComplete;

  // Определяем, какой текст показывать
  const displayText = isShowingEnglish && englishWord ? englishWord : word;
  const isEnglish = isShowingEnglish && !!englishWord;

  return (
    <motion.div
      key={word}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{
        textAlign: 'center',
        marginBottom: '32px',
      }}
    >
      {showHint && (
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.6rem',
            color: 'rgba(255, 255, 255, 0.7)',
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.9)',
            marginBottom: '12px',
          }}
        >
<span style={{ fontSize: '1.2rem' }}>🎤</span> Say in English
        </div>
      )}
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: getFontSize(displayText),
          fontWeight: 'normal',
          color: isEnglish ? '#22c55e' : 'white',
          textShadow: '3px 3px 0 rgba(0, 0, 0, 0.9)',
          lineHeight: 1.5,
          textTransform: isEnglish ? 'uppercase' : 'none',
        }}
      >
        {displayText}
      </div>
    </motion.div>
  );
};
