export const THEME = {
  colors: {
    success: '#10b981',
    error: '#ef4444',
    primary: '#3b82f6',
    background: 'rgba(0, 0, 0, 0.3)',
  },
  gradientOverlay: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
};

export const MOTIVATIONAL_MESSAGES = {
  perfect: [
    'Perfect! You\'re a language master!',
    'Flawless victory! Amazing!',
    '10/10! You\'re unstoppable!'
  ],
  great: [
    'Great job! Keep it up!',
    'Excellent work!',
    'You\'re doing amazing!'
  ],
  good: [
    'Good effort! Practice makes perfect!',
    'Nice try! You\'re improving!',
    'Keep learning, you\'re growing!'
  ],
  needsWork: [
    'Don\'t give up! Try again!',
    'Every mistake is a lesson!',
    'You can do better next time!'
  ]
};

export const getMotivationalMessage = (score: number): string => {
  if (score === 10) {
    return MOTIVATIONAL_MESSAGES.perfect[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.perfect.length)];
  } else if (score >= 7) {
    return MOTIVATIONAL_MESSAGES.great[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.great.length)];
  } else if (score >= 5) {
    return MOTIVATIONAL_MESSAGES.good[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.good.length)];
  } else {
    return MOTIVATIONAL_MESSAGES.needsWork[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.needsWork.length)];
  }
};
