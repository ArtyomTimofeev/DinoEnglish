import type { Word } from '@/types/game.types';

export const WORD_DATASET: Word[] = [
  {
    russian: 'ПРИКЛЮЧЕНИЕ',
    englishAnswers: ['adventure']
  },
  {
    russian: 'ЗНАНИЕ',
    englishAnswers: ['knowledge']
  },
  {
    russian: 'ВЫЗОВ',
    englishAnswers: ['challenge', 'dare']
  },
  {
    russian: 'УСПЕХ',
    englishAnswers: ['success']
  },
  {
    russian: 'ВОЗМОЖНОСТЬ',
    englishAnswers: ['opportunity', 'chance', 'possibility']
  },
  {
    russian: 'СМЕЛОСТЬ',
    englishAnswers: ['courage', 'bravery']
  },
  {
    russian: 'ОПЫТ',
    englishAnswers: ['experience']
  },
  {
    russian: 'ТВОРЧЕСТВО',
    englishAnswers: ['creativity', 'creation']
  },
  {
    russian: 'ДОСТИЖЕНИЕ',
    englishAnswers: ['achievement', 'accomplishment']
  },
  {
    russian: 'УВЕРЕННОСТЬ',
    englishAnswers: ['confidence']
  },
  // Простые слова
  {
    russian: 'КОШКА',
    englishAnswers: ['cat']
  },
  {
    russian: 'СОБАКА',
    englishAnswers: ['dog']
  },
  {
    russian: 'ДОМ',
    englishAnswers: ['house', 'home']
  },
  {
    russian: 'ВОДА',
    englishAnswers: ['water']
  },
  {
    russian: 'КНИГА',
    englishAnswers: ['book']
  },
  {
    russian: 'СОЛНЦЕ',
    englishAnswers: ['sun']
  },
  {
    russian: 'ДЕРЕВО',
    englishAnswers: ['tree']
  },
  {
    russian: 'ЯБЛОКО',
    englishAnswers: ['apple']
  },
  {
    russian: 'ХЛЕБ',
    englishAnswers: ['bread']
  },
  {
    russian: 'МОЛОКО',
    englishAnswers: ['milk']
  },
  {
    russian: 'ПТИЦА',
    englishAnswers: ['bird']
  },
  {
    russian: 'РЫБА',
    englishAnswers: ['fish']
  },
  {
    russian: 'ЦВЕТОК',
    englishAnswers: ['flower']
  },
  {
    russian: 'ДРУГ',
    englishAnswers: ['friend']
  },
  {
    russian: 'ВРЕМЯ',
    englishAnswers: ['time']
  },
  {
    russian: 'ГОРОД',
    englishAnswers: ['city', 'town']
  },
  {
    russian: 'ШКОЛА',
    englishAnswers: ['school']
  },
  {
    russian: 'МУЗЫКА',
    englishAnswers: ['music']
  },
  {
    russian: 'РАБОТА',
    englishAnswers: ['work', 'job']
  },
  {
    russian: 'СЧАСТЬЕ',
    englishAnswers: ['happiness', 'happy']
  }
];

// Shuffle array for randomization
export const shuffleWords = (words: Word[]): Word[] => {
  const shuffled = [...words];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
