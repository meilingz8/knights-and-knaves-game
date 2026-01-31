/**
 * Knights and Knaves Puzzle Generator
 * Knights always tell the truth, Knaves always lie
 */

export type CharacterType = 'knight' | 'knave';
export type GameMode = 'slow' | 'rapid' | 'blitz';

export interface Character {
  id: number;
  name: string;
  type: CharacterType;
  emoji: string;
}

export interface Puzzle {
  id: string;
  characters: Character[];
  statement: string;
  correctAnswer: number; // ID of the truth-teller
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in seconds
}

export interface GameSession {
  id: string;
  mode: GameMode;
  difficulty: 'easy' | 'medium' | 'hard';
  numCharacters: number;
  puzzles: Puzzle[];
  currentPuzzleIndex: number;
  score: number;
  streak: number;
  startTime: number;
}

// Character names and emojis for cute cartoon style
const CHARACTER_NAMES = [
  { name: 'Luna', emoji: '🌙' },
  { name: 'Sunny', emoji: '☀️' },
  { name: 'Breezy', emoji: '💨' },
  { name: 'Sparkle', emoji: '✨' },
  { name: 'Whisper', emoji: '🌬️' },
  { name: 'Giggles', emoji: '😄' },
  { name: 'Zippy', emoji: '⚡' },
  { name: 'Cozy', emoji: '🔥' },
  { name: 'Bubbles', emoji: '🫧' },
  { name: 'Starlight', emoji: '⭐' },
];

// Puzzle statement templates
const STATEMENT_TEMPLATES = {
  easy: [
    '{name1} says: "I am a knight"',
    '{name1} says: "{name2} is a knave"',
    '{name1} says: "We are both knights"',
  ],
  medium: [
    '{name1} says: "{name2} is a knight and I am a knave"',
    '{name1} says: "Either we are both knights or both knaves"',
    '{name1} says: "{name2} is a knave or I am a knight"',
  ],
  hard: [
    '{name1} says: "If I am a knight, then {name2} is a knight"',
    '{name1} says: "{name2} says I am a knave"',
    '{name1} says: "We are the same type if and only if {name2} is a knight"',
  ],
};

/**
 * Generate a random puzzle
 */
export function generatePuzzle(
  difficulty: 'easy' | 'medium' | 'hard' = 'easy',
  numCharacters: number = 2
): Puzzle {
  // Select random characters
  const selectedCharacters = selectRandomCharacters(numCharacters);
  
  // Randomly assign knight/knave types
  const characters = selectedCharacters.map((char, index) => ({
    ...char,
    type: Math.random() > 0.5 ? 'knight' : 'knave' as CharacterType,
  }));

  // Find a truth-teller (knight)
  const truthTeller = characters.find(c => c.type === 'knight');
  const correctAnswer = truthTeller?.id || characters[0].id;

  // Generate statement
  const statement = generateStatement(characters, difficulty);

  // Time limits based on difficulty
  const timeLimits = {
    easy: 30,
    medium: 45,
    hard: 60,
  };

  return {
    id: `puzzle-${Date.now()}-${Math.random()}`,
    characters,
    statement,
    correctAnswer,
    difficulty,
    timeLimit: timeLimits[difficulty],
  };
}

/**
 * Generate multiple puzzles for a game session
 */
export function generatePuzzles(
  count: number,
  difficulty: 'easy' | 'medium' | 'hard',
  numCharacters: number
): Puzzle[] {
  return Array.from({ length: count }, () =>
    generatePuzzle(difficulty, numCharacters)
  );
}

/**
 * Select random characters from the pool
 */
function selectRandomCharacters(count: number): Omit<Character, 'type'>[] {
  const shuffled = [...CHARACTER_NAMES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, CHARACTER_NAMES.length)).map((char, index) => ({
    id: index,
    name: char.name,
    emoji: char.emoji,
  }));
}

/**
 * Generate a logical statement
 */
function generateStatement(
  characters: Character[],
  difficulty: 'easy' | 'medium' | 'hard'
): string {
  const templates = STATEMENT_TEMPLATES[difficulty];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  let statement = template;
  statement = statement.replace('{name1}', characters[0].name);
  if (characters.length > 1) {
    statement = statement.replace('{name2}', characters[1].name);
  }
  
  return statement;
}

/**
 * Verify if an answer is correct
 */
export function verifyAnswer(puzzle: Puzzle, selectedCharacterId: number): boolean {
  return selectedCharacterId === puzzle.correctAnswer;
}

/**
 * Get time limit based on game mode
 */
export function getTimeLimitByMode(mode: GameMode): number {
  const limits = {
    slow: 60,
    rapid: 30,
    blitz: 10,
  };
  return limits[mode];
}

/**
 * Calculate score based on time and difficulty
 */
export function calculateScore(
  difficulty: 'easy' | 'medium' | 'hard',
  timeSpent: number,
  timeLimit: number
): number {
  const baseScores = {
    easy: 10,
    medium: 25,
    hard: 50,
  };

  const baseScore = baseScores[difficulty];
  const timeBonus = Math.max(0, Math.floor((timeLimit - timeSpent) / timeLimit * baseScore));
  
  return baseScore + timeBonus;
}
