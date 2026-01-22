import type { Word, GameCEFRLevel } from '@/types/game.types';

// ============================================
// Level A1 - Beginner (50+ words)
// Basic everyday vocabulary
// ============================================
const A1_WORDS: Word[] = [
  // Home & Objects
  { russian: 'ДОМ', englishAnswers: ['house', 'home'], level: 'A1' },
  { russian: 'СТОЛ', englishAnswers: ['table'], level: 'A1' },
  { russian: 'СТУЛ', englishAnswers: ['chair'], level: 'A1' },
  { russian: 'ОКНО', englishAnswers: ['window'], level: 'A1' },
  { russian: 'ДВЕРЬ', englishAnswers: ['door'], level: 'A1' },
  { russian: 'КОМНАТА', englishAnswers: ['room'], level: 'A1' },
  { russian: 'КРОВАТЬ', englishAnswers: ['bed'], level: 'A1' },
  { russian: 'ЛАМПА', englishAnswers: ['lamp'], level: 'A1' },
  { russian: 'ЗЕРКАЛО', englishAnswers: ['mirror'], level: 'A1' },
  { russian: 'ЧАСЫ', englishAnswers: ['clock', 'watch'], level: 'A1' },

  // Food & Drink
  { russian: 'ВОДА', englishAnswers: ['water'], level: 'A1' },
  { russian: 'ХЛЕБ', englishAnswers: ['bread'], level: 'A1' },
  { russian: 'МОЛОКО', englishAnswers: ['milk'], level: 'A1' },
  { russian: 'ЯБЛОКО', englishAnswers: ['apple'], level: 'A1' },
  { russian: 'БАНАН', englishAnswers: ['banana'], level: 'A1' },
  { russian: 'КОФЕ', englishAnswers: ['coffee'], level: 'A1' },
  { russian: 'СОК', englishAnswers: ['juice'], level: 'A1' },
  { russian: 'СЫР', englishAnswers: ['cheese'], level: 'A1' },
  { russian: 'МЯСО', englishAnswers: ['meat'], level: 'A1' },
  { russian: 'РИС', englishAnswers: ['rice'], level: 'A1' },

  // Family
  { russian: 'МАМА', englishAnswers: ['mom', 'mother', 'mum'], level: 'A1' },
  { russian: 'ПАПА', englishAnswers: ['dad', 'father'], level: 'A1' },
  { russian: 'БРАТ', englishAnswers: ['brother'], level: 'A1' },
  { russian: 'СЕСТРА', englishAnswers: ['sister'], level: 'A1' },
  { russian: 'СЕМЬЯ', englishAnswers: ['family'], level: 'A1' },
  { russian: 'РЕБЁНОК', englishAnswers: ['child', 'kid'], level: 'A1' },
  { russian: 'ДРУГ', englishAnswers: ['friend'], level: 'A1' },

  // // Nature & Weather
  { russian: 'СОЛНЦЕ', englishAnswers: ['sun'], level: 'A1' },
  { russian: 'ДЕРЕВО', englishAnswers: ['tree'], level: 'A1' },
  { russian: 'ЦВЕТОК', englishAnswers: ['flower'], level: 'A1' },
  { russian: 'НЕБО', englishAnswers: ['sky'], level: 'A1' },
  { russian: 'ДОЖДЬ', englishAnswers: ['rain'], level: 'A1' },
  { russian: 'СНЕГ', englishAnswers: ['snow'], level: 'A1' },
  { russian: 'ВЕТЕР', englishAnswers: ['wind'], level: 'A1' },

  // // Places
  { russian: 'ШКОЛА', englishAnswers: ['school'], level: 'A1' },
  { russian: 'МАГАЗИН', englishAnswers: ['shop', 'store'], level: 'A1' },
  { russian: 'УЛИЦА', englishAnswers: ['street'], level: 'A1' },
  { russian: 'ПАРК', englishAnswers: ['park'], level: 'A1' },

  // // Basic items
  { russian: 'КНИГА', englishAnswers: ['book'], level: 'A1' },
  { russian: 'РУЧКА', englishAnswers: ['pen'], level: 'A1' },
  { russian: 'ТЕЛЕФОН', englishAnswers: ['phone', 'telephone'], level: 'A1' },
  { russian: 'СУМКА', englishAnswers: ['bag'], level: 'A1' },
  { russian: 'ОДЕЖДА', englishAnswers: ['clothes', 'clothing'], level: 'A1' },

  // // Colors
  { russian: 'ЦВЕТ', englishAnswers: ['color', 'colour'], level: 'A1' },
  { russian: 'КРАСНЫЙ', englishAnswers: ['red'], level: 'A1' },
  { russian: 'СИНИЙ', englishAnswers: ['blue'], level: 'A1' },
  { russian: 'ЗЕЛЁНЫЙ', englishAnswers: ['green'], level: 'A1' },
  { russian: 'БЕЛЫЙ', englishAnswers: ['white'], level: 'A1' },
  { russian: 'ЧЁРНЫЙ', englishAnswers: ['black'], level: 'A1' },

  // Basic concepts
  { russian: 'ДЕНЬ', englishAnswers: ['day'], level: 'A1' },
  { russian: 'НОЧЬ', englishAnswers: ['night'], level: 'A1' },
  { russian: 'УТРО', englishAnswers: ['morning'], level: 'A1' },
  { russian: 'ВЕЧЕР', englishAnswers: ['evening'], level: 'A1' },
  { russian: 'ГОД', englishAnswers: ['year'], level: 'A1' },
  { russian: 'МЕСЯЦ', englishAnswers: ['month'], level: 'A1' },
  { russian: 'НЕДЕЛЯ', englishAnswers: ['week'], level: 'A1' },
];

// ============================================
// Level A2 - Elementary (50+ words)
// Extended everyday vocabulary
// ============================================
const A2_WORDS: Word[] = [
  // Time & Schedule
  { russian: 'ВРЕМЯ', englishAnswers: ['time'], level: 'A2' },
  { russian: 'МИНУТА', englishAnswers: ['minute'], level: 'A2' },
  { russian: 'СЕГОДНЯ', englishAnswers: ['today'], level: 'A2' },
  { russian: 'ЗАВТРА', englishAnswers: ['tomorrow'], level: 'A2' },
  { russian: 'ВЧЕРА', englishAnswers: ['yesterday'], level: 'A2' },
  { russian: 'ВСЕГДА', englishAnswers: ['always'], level: 'A2' },
  { russian: 'НИКОГДА', englishAnswers: ['never'], level: 'A2' },
  { russian: 'ИНОГДА', englishAnswers: ['sometimes'], level: 'A2' },

  // Places & City
  { russian: 'ГОРОД', englishAnswers: ['city', 'town'], level: 'A2' },
  { russian: 'СТРАНА', englishAnswers: ['country'], level: 'A2' },
  { russian: 'МУЗЕЙ', englishAnswers: ['museum'], level: 'A2' },
  { russian: 'БОЛЬНИЦА', englishAnswers: ['hospital'], level: 'A2' },
  { russian: 'АЭРОПОРТ', englishAnswers: ['airport'], level: 'A2' },
  {
    russian: 'ВОКЗАЛ',
    englishAnswers: ['station', 'train station'],
    level: 'A2',
  },
  { russian: 'БИБЛИОТЕКА', englishAnswers: ['library'], level: 'A2' },
  { russian: 'РЕСТОРАН', englishAnswers: ['restaurant'], level: 'A2' },
  { russian: 'ОТЕЛЬ', englishAnswers: ['hotel'], level: 'A2' },

  // Work & Education
  { russian: 'РАБОТА', englishAnswers: ['work', 'job'], level: 'A2' },
  { russian: 'ОФИС', englishAnswers: ['office'], level: 'A2' },
  { russian: 'УЧИТЕЛЬ', englishAnswers: ['teacher'], level: 'A2' },
  { russian: 'ВРАЧ', englishAnswers: ['doctor'], level: 'A2' },
  { russian: 'СТУДЕНТ', englishAnswers: ['student'], level: 'A2' },
  { russian: 'УРОК', englishAnswers: ['lesson'], level: 'A2' },
  { russian: 'ЭКЗАМЕН', englishAnswers: ['exam', 'examination'], level: 'A2' },

  // Emotions & States
  { russian: 'СЧАСТЬЕ', englishAnswers: ['happiness'], level: 'A2' },
  { russian: 'РАДОСТЬ', englishAnswers: ['joy'], level: 'A2' },
  { russian: 'ГРУСТЬ', englishAnswers: ['sadness'], level: 'A2' },
  { russian: 'СТРАХ', englishAnswers: ['fear'], level: 'A2' },
  { russian: 'ЛЮБОВЬ', englishAnswers: ['love'], level: 'A2' },
  {
    russian: 'УСТАЛОСТЬ',
    englishAnswers: ['tiredness', 'fatigue'],
    level: 'A2',
  },

  // Transport
  { russian: 'МАШИНА', englishAnswers: ['car'], level: 'A2' },
  { russian: 'АВТОБУС', englishAnswers: ['bus'], level: 'A2' },
  { russian: 'ПОЕЗД', englishAnswers: ['train'], level: 'A2' },
  { russian: 'САМОЛЁТ', englishAnswers: ['plane', 'airplane'], level: 'A2' },
  { russian: 'ВЕЛОСИПЕД', englishAnswers: ['bicycle', 'bike'], level: 'A2' },
  { russian: 'БИЛЕТ', englishAnswers: ['ticket'], level: 'A2' },

  // Shopping & Money
  { russian: 'ДЕНЬГИ', englishAnswers: ['money'], level: 'A2' },
  { russian: 'ЦЕНА', englishAnswers: ['price'], level: 'A2' },
  { russian: 'ПОКУПКА', englishAnswers: ['purchase', 'shopping'], level: 'A2' },
  { russian: 'СКИДКА', englishAnswers: ['discount', 'sale'], level: 'A2' },

  // Health & Body
  { russian: 'ЗДОРОВЬЕ', englishAnswers: ['health'], level: 'A2' },
  { russian: 'ГОЛОВА', englishAnswers: ['head'], level: 'A2' },
  { russian: 'РУКА', englishAnswers: ['hand', 'arm'], level: 'A2' },
  { russian: 'НОГА', englishAnswers: ['leg', 'foot'], level: 'A2' },
  { russian: 'СЕРДЦЕ', englishAnswers: ['heart'], level: 'A2' },

  // Activities
  { russian: 'МУЗЫКА', englishAnswers: ['music'], level: 'A2' },
  { russian: 'ФИЛЬМ', englishAnswers: ['film', 'movie'], level: 'A2' },
  { russian: 'СПОРТ', englishAnswers: ['sport', 'sports'], level: 'A2' },
  { russian: 'ИГРА', englishAnswers: ['game'], level: 'A2' },
  {
    russian: 'ПРАЗДНИК',
    englishAnswers: ['holiday', 'celebration'],
    level: 'A2',
  },
  { russian: 'ПОДАРОК', englishAnswers: ['gift', 'present'], level: 'A2' },

  // Food extended
  { russian: 'ЗАВТРАК', englishAnswers: ['breakfast'], level: 'A2' },
  { russian: 'ОБЕД', englishAnswers: ['lunch', 'dinner'], level: 'A2' },
  { russian: 'УЖИН', englishAnswers: ['dinner', 'supper'], level: 'A2' },
  { russian: 'ОВОЩИ', englishAnswers: ['vegetables'], level: 'A2' },
  { russian: 'ФРУКТЫ', englishAnswers: ['fruit', 'fruits'], level: 'A2' },

  // Qualities
  { russian: 'УСПЕХ', englishAnswers: ['success'], level: 'A2' },
  { russian: 'ПРОБЛЕМА', englishAnswers: ['problem'], level: 'A2' },
  { russian: 'ВОПРОС', englishAnswers: ['question'], level: 'A2' },
  { russian: 'ОТВЕТ', englishAnswers: ['answer'], level: 'A2' },
];

// ============================================
// Level B1 - Intermediate (50+ words)
// Abstract concepts, opinions, experiences
// ============================================
const B1_WORDS: Word[] = [
  // Abstract concepts
  {
    russian: 'ВОЗМОЖНОСТЬ',
    englishAnswers: ['opportunity', 'chance', 'possibility'],
    level: 'B1',
  },
  { russian: 'ЗНАНИЕ', englishAnswers: ['knowledge'], level: 'B1' },
  { russian: 'ОПЫТ', englishAnswers: ['experience'], level: 'B1' },
  { russian: 'ПРИКЛЮЧЕНИЕ', englishAnswers: ['adventure'], level: 'B1' },
  { russian: 'МЕЧТА', englishAnswers: ['dream'], level: 'B1' },
  { russian: 'ЦЕЛЬ', englishAnswers: ['goal', 'aim', 'target'], level: 'B1' },
  { russian: 'ПЛАН', englishAnswers: ['plan'], level: 'B1' },
  { russian: 'ИДЕЯ', englishAnswers: ['idea'], level: 'B1' },
  { russian: 'МНЕНИЕ', englishAnswers: ['opinion'], level: 'B1' },
  { russian: 'РЕШЕНИЕ', englishAnswers: ['decision', 'solution'], level: 'B1' },

  // Work & Career
  { russian: 'КАРЬЕРА', englishAnswers: ['career'], level: 'B1' },
  { russian: 'ЗАРПЛАТА', englishAnswers: ['salary', 'wage'], level: 'B1' },
  { russian: 'СОБЕСЕДОВАНИЕ', englishAnswers: ['interview'], level: 'B1' },
  { russian: 'НАВЫК', englishAnswers: ['skill'], level: 'B1' },
  { russian: 'ЗАДАЧА', englishAnswers: ['task'], level: 'B1' },
  { russian: 'ПРОЕКТ', englishAnswers: ['project'], level: 'B1' },
  { russian: 'ВСТРЕЧА', englishAnswers: ['meeting'], level: 'B1' },
  { russian: 'КОЛЛЕГА', englishAnswers: ['colleague'], level: 'B1' },

  // Education & Learning
  { russian: 'ОБРАЗОВАНИЕ', englishAnswers: ['education'], level: 'B1' },
  { russian: 'КУРС', englishAnswers: ['course'], level: 'B1' },
  { russian: 'ДИПЛОМ', englishAnswers: ['diploma', 'degree'], level: 'B1' },
  {
    russian: 'ИССЛЕДОВАНИЕ',
    englishAnswers: ['research', 'study'],
    level: 'B1',
  },
  { russian: 'РЕЗУЛЬТАТ', englishAnswers: ['result'], level: 'B1' },

  // Social & Relationships
  {
    russian: 'ОТНОШЕНИЯ',
    englishAnswers: ['relationship', 'relations'],
    level: 'B1',
  },
  { russian: 'ОБЩЕНИЕ', englishAnswers: ['communication'], level: 'B1' },
  { russian: 'ПОДДЕРЖКА', englishAnswers: ['support'], level: 'B1' },
  { russian: 'ДОВЕРИЕ', englishAnswers: ['trust'], level: 'B1' },
  { russian: 'УВАЖЕНИЕ', englishAnswers: ['respect'], level: 'B1' },
  { russian: 'СОВЕТ', englishAnswers: ['advice'], level: 'B1' },

  // Environment & Society
  { russian: 'ПРИРОДА', englishAnswers: ['nature'], level: 'B1' },
  {
    russian: 'ОКРУЖЕНИЕ',
    englishAnswers: ['environment', 'surroundings'],
    level: 'B1',
  },
  { russian: 'ОБЩЕСТВО', englishAnswers: ['society'], level: 'B1' },
  { russian: 'КУЛЬТУРА', englishAnswers: ['culture'], level: 'B1' },
  { russian: 'ТРАДИЦИЯ', englishAnswers: ['tradition'], level: 'B1' },
  { russian: 'ИСТОРИЯ', englishAnswers: ['history', 'story'], level: 'B1' },

  // Travel
  {
    russian: 'ПУТЕШЕСТВИЕ',
    englishAnswers: ['travel', 'journey', 'trip'],
    level: 'B1',
  },
  {
    russian: 'НАПРАВЛЕНИЕ',
    englishAnswers: ['direction', 'destination'],
    level: 'B1',
  },
  { russian: 'ГРАНИЦА', englishAnswers: ['border', 'boundary'], level: 'B1' },
  { russian: 'ВИЗА', englishAnswers: ['visa'], level: 'B1' },
  { russian: 'ПАСПОРТ', englishAnswers: ['passport'], level: 'B1' },

  // Qualities & Traits
  { russian: 'КАЧЕСТВО', englishAnswers: ['quality'], level: 'B1' },
  { russian: 'СПОСОБНОСТЬ', englishAnswers: ['ability'], level: 'B1' },
  {
    russian: 'ХАРАКТЕР',
    englishAnswers: ['character', 'personality'],
    level: 'B1',
  },
  {
    russian: 'ПОВЕДЕНИЕ',
    englishAnswers: ['behavior', 'behaviour'],
    level: 'B1',
  },
  { russian: 'ПРИВЫЧКА', englishAnswers: ['habit'], level: 'B1' },

  // Situations
  { russian: 'СИТУАЦИЯ', englishAnswers: ['situation'], level: 'B1' },
  { russian: 'УСЛОВИЕ', englishAnswers: ['condition'], level: 'B1' },
  { russian: 'ПРИЧИНА', englishAnswers: ['reason', 'cause'], level: 'B1' },
  { russian: 'ПОСЛЕДСТВИЕ', englishAnswers: ['consequence'], level: 'B1' },
  { russian: 'ИЗМЕНЕНИЕ', englishAnswers: ['change'], level: 'B1' },

  // Technology
  { russian: 'ТЕХНОЛОГИЯ', englishAnswers: ['technology'], level: 'B1' },
  { russian: 'ИНТЕРНЕТ', englishAnswers: ['internet'], level: 'B1' },
  {
    russian: 'ПРОГРАММА',
    englishAnswers: ['program', 'programme'],
    level: 'B1',
  },
  { russian: 'СООБЩЕНИЕ', englishAnswers: ['message'], level: 'B1' },
];

// ============================================
// Level B2 - Upper Intermediate (50+ words)
// Complex emotions, business, academic vocabulary
// ============================================
const B2_WORDS: Word[] = [
  // Achievement & Success
  // {
  //   russian: 'ДОСТИЖЕНИЕ',
  //   englishAnswers: ['achievement', 'accomplishment'],
  //   level: 'B2',
  // },
  { russian: 'СМЕЛОСТЬ', englishAnswers: ['courage', 'bravery'], level: 'B2' },
  //   {
  //     russian: 'ТВОРЧЕСТВО',
  //     englishAnswers: ['creativity', 'creation'],
  //     level: 'B2',
  //   },
  //   { russian: 'ВЫЗОВ', englishAnswers: ['challenge'], level: 'B2' },
  //   { russian: 'ПОБЕДА', englishAnswers: ['victory', 'win'], level: 'B2' },
  //   { russian: 'ПОРАЖЕНИЕ', englishAnswers: ['defeat', 'failure'], level: 'B2' },
  //   {
  //     russian: 'РАЗВИТИЕ',
  //     englishAnswers: ['development', 'growth'],
  //     level: 'B2',
  //   },
  //   { russian: 'ПРОГРЕСС', englishAnswers: ['progress'], level: 'B2' },

  //   // Business & Economy
  //   {
  //     russian: 'ЭКОНОМИКА',
  //     englishAnswers: ['economy', 'economics'],
  //     level: 'B2',
  //   },
  //   { russian: 'ИНВЕСТИЦИЯ', englishAnswers: ['investment'], level: 'B2' },
  //   { russian: 'ПРИБЫЛЬ', englishAnswers: ['profit'], level: 'B2' },
  //   { russian: 'УБЫТОК', englishAnswers: ['loss'], level: 'B2' },
  //   { russian: 'БЮДЖЕТ', englishAnswers: ['budget'], level: 'B2' },
  //   { russian: 'СТРАТЕГИЯ', englishAnswers: ['strategy'], level: 'B2' },
  //   { russian: 'КОНКУРЕНЦИЯ', englishAnswers: ['competition'], level: 'B2' },
  //   { russian: 'ПАРТНЁРСТВО', englishAnswers: ['partnership'], level: 'B2' },
  //   { russian: 'КОНТРАКТ', englishAnswers: ['contract'], level: 'B2' },
  //   {
  //     russian: 'ПЕРЕГОВОРЫ',
  //     englishAnswers: ['negotiations', 'negotiation'],
  //     level: 'B2',
  //   },

  //   // Complex emotions
  //   { russian: 'РАЗОЧАРОВАНИЕ', englishAnswers: ['disappointment'], level: 'B2' },
  //   { russian: 'УДОВЛЕТВОРЕНИЕ', englishAnswers: ['satisfaction'], level: 'B2' },
  //   {
  //     russian: 'БЛАГОДАРНОСТЬ',
  //     englishAnswers: ['gratitude', 'thankfulness'],
  //     level: 'B2',
  //   },
  //   {
  //     russian: 'СОЧУВСТВИЕ',
  //     englishAnswers: ['sympathy', 'compassion'],
  //     level: 'B2',
  //   },
  //   { russian: 'ТРЕВОГА', englishAnswers: ['anxiety', 'worry'], level: 'B2' },
  //   { russian: 'ВДОХНОВЕНИЕ', englishAnswers: ['inspiration'], level: 'B2' },
  //   { russian: 'ЭНТУЗИАЗМ', englishAnswers: ['enthusiasm'], level: 'B2' },

  //   // Society & Politics
  //   { russian: 'ДЕМОКРАТИЯ', englishAnswers: ['democracy'], level: 'B2' },
  //   { russian: 'СВОБОДА', englishAnswers: ['freedom', 'liberty'], level: 'B2' },
  //   {
  //     russian: 'СПРАВЕДЛИВОСТЬ',
  //     englishAnswers: ['justice', 'fairness'],
  //     level: 'B2',
  //   },
  //   { russian: 'РАВЕНСТВО', englishAnswers: ['equality'], level: 'B2' },
  //   {
  //     russian: 'ОТВЕТСТВЕННОСТЬ',
  //     englishAnswers: ['responsibility'],
  //     level: 'B2',
  //   },
  //   { russian: 'ВЛИЯНИЕ', englishAnswers: ['influence', 'impact'], level: 'B2' },
  //   { russian: 'РЕФОРМА', englishAnswers: ['reform'], level: 'B2' },

  //   // Academic
  //   { russian: 'АНАЛИЗ', englishAnswers: ['analysis'], level: 'B2' },
  //   { russian: 'ТЕОРИЯ', englishAnswers: ['theory'], level: 'B2' },
  //   { russian: 'ПРАКТИКА', englishAnswers: ['practice'], level: 'B2' },
  //   { russian: 'МЕТОД', englishAnswers: ['method'], level: 'B2' },
  //   { russian: 'ПОДХОД', englishAnswers: ['approach'], level: 'B2' },
  //   { russian: 'КОНЦЕПЦИЯ', englishAnswers: ['concept'], level: 'B2' },
  //   {
  //     russian: 'КРИТЕРИЙ',
  //     englishAnswers: ['criterion', 'criteria'],
  //     level: 'B2',
  //   },
  //   { russian: 'ГИПОТЕЗА', englishAnswers: ['hypothesis'], level: 'B2' },

  //   // Personal qualities
  //   { russian: 'ЧЕСТНОСТЬ', englishAnswers: ['honesty'], level: 'B2' },
  //   { russian: 'ТЕРПЕНИЕ', englishAnswers: ['patience'], level: 'B2' },
  //   {
  //     russian: 'НАСТОЙЧИВОСТЬ',
  //     englishAnswers: ['persistence', 'perseverance'],
  //     level: 'B2',
  //   },
  //   { russian: 'ГИБКОСТЬ', englishAnswers: ['flexibility'], level: 'B2' },
  //   { russian: 'НАДЁЖНОСТЬ', englishAnswers: ['reliability'], level: 'B2' },
  //   { russian: 'НЕЗАВИСИМОСТЬ', englishAnswers: ['independence'], level: 'B2' },

  //   // Communication
  //   { russian: 'АРГУМЕНТ', englishAnswers: ['argument'], level: 'B2' },
  //   { russian: 'ДИСКУССИЯ', englishAnswers: ['discussion'], level: 'B2' },
  //   { russian: 'КОМПРОМИСС', englishAnswers: ['compromise'], level: 'B2' },
  //   { russian: 'СОГЛАШЕНИЕ', englishAnswers: ['agreement'], level: 'B2' },
];

// ============================================
// Level C1 - Advanced (50+ words)
// Sophisticated vocabulary, formal register
// ============================================
const C1_WORDS: Word[] = [
  // Confidence & Character
  { russian: 'УВЕРЕННОСТЬ', englishAnswers: ['confidence'], level: 'C1' },
  { russian: 'ЦЕЛОСТНОСТЬ', englishAnswers: ['integrity'], level: 'C1' },
  { russian: 'МУДРОСТЬ', englishAnswers: ['wisdom'], level: 'C1' },
  {
    russian: 'ПРОНИЦАТЕЛЬНОСТЬ',
    englishAnswers: ['insight', 'perception'],
    level: 'C1',
  },
  {
    russian: 'СКРОМНОСТЬ',
    englishAnswers: ['modesty', 'humility'],
    level: 'C1',
  },
  {
    russian: 'САМООБЛАДАНИЕ',
    englishAnswers: ['composure', 'self-control'],
    level: 'C1',
  },
  {
    russian: 'СТОЙКОСТЬ',
    englishAnswers: ['resilience', 'fortitude'],
    level: 'C1',
  },

  // Intellectual concepts
  { russian: 'ПАРАДИГМА', englishAnswers: ['paradigm'], level: 'C1' },
  { russian: 'КОНТЕКСТ', englishAnswers: ['context'], level: 'C1' },
  { russian: 'НЮАНС', englishAnswers: ['nuance'], level: 'C1' },
  { russian: 'ДВУСМЫСЛЕННОСТЬ', englishAnswers: ['ambiguity'], level: 'C1' },
  {
    russian: 'ПРОТИВОРЕЧИЕ',
    englishAnswers: ['contradiction', 'paradox'],
    level: 'C1',
  },
  { russian: 'КОРРЕЛЯЦИЯ', englishAnswers: ['correlation'], level: 'C1' },
  {
    russian: 'ПРЕДПОСЫЛКА',
    englishAnswers: ['premise', 'precondition'],
    level: 'C1',
  },
  { russian: 'ИМПЛИКАЦИЯ', englishAnswers: ['implication'], level: 'C1' },

  // Professional & Academic
  {
    russian: 'КОМПЕТЕНТНОСТЬ',
    englishAnswers: ['competence', 'competency'],
    level: 'C1',
  },
  { russian: 'МЕТОДОЛОГИЯ', englishAnswers: ['methodology'], level: 'C1' },
  {
    russian: 'ЭФФЕКТИВНОСТЬ',
    englishAnswers: ['efficiency', 'effectiveness'],
    level: 'C1',
  },
  { russian: 'ИННОВАЦИЯ', englishAnswers: ['innovation'], level: 'C1' },
  { russian: 'ОПТИМИЗАЦИЯ', englishAnswers: ['optimization'], level: 'C1' },
  {
    russian: 'РЕНТАБЕЛЬНОСТЬ',
    englishAnswers: ['profitability', 'viability'],
    level: 'C1',
  },
  {
    russian: 'ДИВЕРСИФИКАЦИЯ',
    englishAnswers: ['diversification'],
    level: 'C1',
  },

  // Legal & Administrative
  { russian: 'ЮРИСДИКЦИЯ', englishAnswers: ['jurisdiction'], level: 'C1' },
  {
    russian: 'РЕГЛАМЕНТ',
    englishAnswers: ['regulation', 'regulations'],
    level: 'C1',
  },
  { russian: 'ЗАКОНОДАТЕЛЬСТВО', englishAnswers: ['legislation'], level: 'C1' },
  { russian: 'ПРЕЦЕДЕНТ', englishAnswers: ['precedent'], level: 'C1' },
  { russian: 'САНКЦИЯ', englishAnswers: ['sanction'], level: 'C1' },
  { russian: 'РАТИФИКАЦИЯ', englishAnswers: ['ratification'], level: 'C1' },

  // Social phenomena
  {
    russian: 'ГЛОБАЛИЗАЦИЯ',
    englishAnswers: ['globalization', 'globalisation'],
    level: 'C1',
  },
  {
    russian: 'УРБАНИЗАЦИЯ',
    englishAnswers: ['urbanization', 'urbanisation'],
    level: 'C1',
  },
  { russian: 'СТЕРЕОТИП', englishAnswers: ['stereotype'], level: 'C1' },
  {
    russian: 'ПРЕДУБЕЖДЕНИЕ',
    englishAnswers: ['prejudice', 'bias'],
    level: 'C1',
  },
  { russian: 'ДИСКРИМИНАЦИЯ', englishAnswers: ['discrimination'], level: 'C1' },
  { russian: 'ТОЛЕРАНТНОСТЬ', englishAnswers: ['tolerance'], level: 'C1' },

  // Complex actions
  {
    russian: 'ОБОСНОВАНИЕ',
    englishAnswers: ['justification', 'rationale'],
    level: 'C1',
  },
  { russian: 'ИНТЕРПРЕТАЦИЯ', englishAnswers: ['interpretation'], level: 'C1' },
  { russian: 'РЕКОНСТРУКЦИЯ', englishAnswers: ['reconstruction'], level: 'C1' },
  { russian: 'ТРАНСФОРМАЦИЯ', englishAnswers: ['transformation'], level: 'C1' },
  { russian: 'КОНСОЛИДАЦИЯ', englishAnswers: ['consolidation'], level: 'C1' },
  { russian: 'ИНТЕГРАЦИЯ', englishAnswers: ['integration'], level: 'C1' },

  // Abstract qualities
  { russian: 'ОБЪЕКТИВНОСТЬ', englishAnswers: ['objectivity'], level: 'C1' },
  { russian: 'СУБЪЕКТИВНОСТЬ', englishAnswers: ['subjectivity'], level: 'C1' },
  { russian: 'РАЦИОНАЛЬНОСТЬ', englishAnswers: ['rationality'], level: 'C1' },
  { russian: 'СПОНТАННОСТЬ', englishAnswers: ['spontaneity'], level: 'C1' },
  { russian: 'НЕОПРЕДЕЛЁННОСТЬ', englishAnswers: ['uncertainty'], level: 'C1' },
  {
    russian: 'УСТОЙЧИВОСТЬ',
    englishAnswers: ['sustainability', 'stability'],
    level: 'C1',
  },

  // Science & Research
  { russian: 'ФЕНОМЕН', englishAnswers: ['phenomenon'], level: 'C1' },
  { russian: 'СИНТЕЗ', englishAnswers: ['synthesis'], level: 'C1' },
  { russian: 'ЭМПИРИЧЕСКИЙ', englishAnswers: ['empirical'], level: 'C1' },
];

// ============================================
// Level C2 - Mastery (50+ words)
// Uses C1 difficulty words as per requirement
// ============================================
const C2_WORDS: Word[] = [
  // Philosophical concepts (C1 difficulty)
  { russian: 'РЕЛЕВАНТНОСТЬ', englishAnswers: ['relevance'], level: 'C2' },
  { russian: 'КОГЕРЕНТНОСТЬ', englishAnswers: ['coherence'], level: 'C2' },
  { russian: 'ДИХОТОМИЯ', englishAnswers: ['dichotomy'], level: 'C2' },
  { russian: 'ЭКВИВАЛЕНТНОСТЬ', englishAnswers: ['equivalence'], level: 'C2' },
  { russian: 'АУТЕНТИЧНОСТЬ', englishAnswers: ['authenticity'], level: 'C2' },
  { russian: 'УНИВЕРСАЛЬНОСТЬ', englishAnswers: ['universality'], level: 'C2' },
  {
    russian: 'СПЕЦИФИКА',
    englishAnswers: ['specificity', 'specifics'],
    level: 'C2',
  },

  // Professional & Technical (C1 difficulty)
  { russian: 'ПРАГМАТИЗМ', englishAnswers: ['pragmatism'], level: 'C2' },
  { russian: 'ДЕТЕРМИНИЗМ', englishAnswers: ['determinism'], level: 'C2' },
  { russian: 'РЕЛЯТИВИЗМ', englishAnswers: ['relativism'], level: 'C2' },
  { russian: 'КОНВЕРГЕНЦИЯ', englishAnswers: ['convergence'], level: 'C2' },
  { russian: 'ДИВЕРГЕНЦИЯ', englishAnswers: ['divergence'], level: 'C2' },
  { russian: 'ПРИОРИТИЗАЦИЯ', englishAnswers: ['prioritization'], level: 'C2' },
  {
    russian: 'СИСТЕМАТИЗАЦИЯ',
    englishAnswers: ['systematization'],
    level: 'C2',
  },

  // Governance & Administration (C1 difficulty)
  { russian: 'ЛЕГИТИМНОСТЬ', englishAnswers: ['legitimacy'], level: 'C2' },
  { russian: 'СУВЕРЕНИТЕТ', englishAnswers: ['sovereignty'], level: 'C2' },
  { russian: 'АВТОНОМИЯ', englishAnswers: ['autonomy'], level: 'C2' },
  { russian: 'БЮРОКРАТИЯ', englishAnswers: ['bureaucracy'], level: 'C2' },
  { russian: 'ИЕРАРХИЯ', englishAnswers: ['hierarchy'], level: 'C2' },
  { russian: 'ПЛЮРАЛИЗМ', englishAnswers: ['pluralism'], level: 'C2' },
  { russian: 'ЦЕНТРАЛИЗАЦИЯ', englishAnswers: ['centralization'], level: 'C2' },

  // Complex processes (C1 difficulty)
  {
    russian: 'СТАНДАРТИЗАЦИЯ',
    englishAnswers: ['standardization'],
    level: 'C2',
  },
  { russian: 'ЛИБЕРАЛИЗАЦИЯ', englishAnswers: ['liberalization'], level: 'C2' },
  { russian: 'МОДЕРНИЗАЦИЯ', englishAnswers: ['modernization'], level: 'C2' },
  {
    russian: 'РАЦИОНАЛИЗАЦИЯ',
    englishAnswers: ['rationalization'],
    level: 'C2',
  },
  { russian: 'ГАРМОНИЗАЦИЯ', englishAnswers: ['harmonization'], level: 'C2' },
  { russian: 'МОНЕТИЗАЦИЯ', englishAnswers: ['monetization'], level: 'C2' },

  // Academic discourse (C1 difficulty)
  { russian: 'ТЕЗИС', englishAnswers: ['thesis'], level: 'C2' },
  { russian: 'АНТИТЕЗИС', englishAnswers: ['antithesis'], level: 'C2' },
  { russian: 'ДЕДУКЦИЯ', englishAnswers: ['deduction'], level: 'C2' },
  { russian: 'ИНДУКЦИЯ', englishAnswers: ['induction'], level: 'C2' },
  { russian: 'АРГУМЕНТАЦИЯ', englishAnswers: ['argumentation'], level: 'C2' },
  { russian: 'АРТИКУЛЯЦИЯ', englishAnswers: ['articulation'], level: 'C2' },

  // Social & Cultural (C1 difficulty)
  { russian: 'ИДЕНТИЧНОСТЬ', englishAnswers: ['identity'], level: 'C2' },
  { russian: 'МЕНТАЛИТЕТ', englishAnswers: ['mentality'], level: 'C2' },
  { russian: 'КОЛЛЕКТИВИЗМ', englishAnswers: ['collectivism'], level: 'C2' },
  { russian: 'ИНДИВИДУАЛИЗМ', englishAnswers: ['individualism'], level: 'C2' },
  {
    russian: 'КОНФОРМИЗМ',
    englishAnswers: ['conformism', 'conformity'],
    level: 'C2',
  },
  { russian: 'НОНКОНФОРМИЗМ', englishAnswers: ['nonconformism'], level: 'C2' },

  // Analytical terms (C1 difficulty)
  { russian: 'ДЕКОНСТРУКЦИЯ', englishAnswers: ['deconstruction'], level: 'C2' },
  { russian: 'ЭКСТРАПОЛЯЦИЯ', englishAnswers: ['extrapolation'], level: 'C2' },
  { russian: 'ИНТЕРПОЛЯЦИЯ', englishAnswers: ['interpolation'], level: 'C2' },
  {
    russian: 'КОНЦЕПТУАЛИЗАЦИЯ',
    englishAnswers: ['conceptualization'],
    level: 'C2',
  },
  {
    russian: 'ОПЕРАЦИОНАЛИЗАЦИЯ',
    englishAnswers: ['operationalization'],
    level: 'C2',
  },
  { russian: 'КАТЕГОРИЗАЦИЯ', englishAnswers: ['categorization'], level: 'C2' },

  // Scientific & Technical (C1 difficulty)
  { russian: 'ВАЛИДНОСТЬ', englishAnswers: ['validity'], level: 'C2' },
  { russian: 'НАДЁЖНОСТЬ', englishAnswers: ['reliability'], level: 'C2' },
  {
    russian: 'РЕПРЕЗЕНТАТИВНОСТЬ',
    englishAnswers: ['representativeness'],
    level: 'C2',
  },
];

// ============================================
// Exports
// ============================================

// Combined dataset for backward compatibility
export const WORD_DATASET: Word[] = [
  ...A1_WORDS,
  ...A2_WORDS,
  ...B1_WORDS,
  ...B2_WORDS,
  ...C1_WORDS,
  ...C2_WORDS,
];

// Export level-specific datasets for targeted selection
export const WORDS_BY_LEVEL: Record<GameCEFRLevel, Word[]> = {
  A1: A1_WORDS,
  A2: A2_WORDS,
  B1: B1_WORDS,
  B2: B2_WORDS,
  C1: C1_WORDS,
  C2: C2_WORDS,
};

// Shuffle array for randomization (Fisher-Yates algorithm)
export const shuffleWords = (words: Word[]): Word[] => {
  const shuffled = [...words];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Select words for game session - 2 per CEFR level = 12 total
export const selectGameWords = (): Word[] => {
  const levels: GameCEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const selectedWords: Word[] = [];

  for (const level of levels) {
    const levelWords = shuffleWords(WORDS_BY_LEVEL[level]);
    selectedWords.push(levelWords[0], levelWords[1]); // Take 2 random words per level
  }

  return selectedWords;
};
