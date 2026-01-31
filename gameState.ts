/**
 * Game State Management
 * Handles streak, scores, and game progress
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameSession, GameMode } from './puzzleGenerator';

export interface PlayerStats {
  totalGamesPlayed: number;
  totalScore: number;
  currentStreak: number;
  longestStreak: number;
  bestScores: {
    slow: number;
    rapid: number;
    blitz: number;
  };
  lastPlayedDate: string;
  gameHistory: GameRecord[];
}

export interface GameRecord {
  id: string;
  mode: GameMode;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  correct: number;
  total: number;
  timeSpent: number;
  date: string;
}

const STORAGE_KEYS = {
  PLAYER_STATS: 'player_stats',
  CURRENT_SESSION: 'current_session',
};

const DEFAULT_STATS: PlayerStats = {
  totalGamesPlayed: 0,
  totalScore: 0,
  currentStreak: 0,
  longestStreak: 0,
  bestScores: {
    slow: 0,
    rapid: 0,
    blitz: 0,
  },
  lastPlayedDate: '',
  gameHistory: [],
};

/**
 * Get player statistics
 */
export async function getPlayerStats(): Promise<PlayerStats> {
  try {
    const stats = await AsyncStorage.getItem(STORAGE_KEYS.PLAYER_STATS);
    return stats ? JSON.parse(stats) : DEFAULT_STATS;
  } catch (error) {
    console.error('Error loading player stats:', error);
    return DEFAULT_STATS;
  }
}

/**
 * Update player statistics after a game
 */
export async function updatePlayerStats(
  gameRecord: GameRecord,
  isWin: boolean
): Promise<PlayerStats> {
  const stats = await getPlayerStats();
  
  // Update streak
  if (isWin) {
    stats.currentStreak += 1;
    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
  } else {
    stats.currentStreak = 0;
  }

  // Update best scores
  if (gameRecord.score > stats.bestScores[gameRecord.mode]) {
    stats.bestScores[gameRecord.mode] = gameRecord.score;
  }

  // Update totals
  stats.totalGamesPlayed += 1;
  stats.totalScore += gameRecord.score;
  stats.lastPlayedDate = new Date().toISOString();
  
  // Add to history (keep last 100 games)
  stats.gameHistory.unshift(gameRecord);
  if (stats.gameHistory.length > 100) {
    stats.gameHistory.pop();
  }

  // Save to storage
  await AsyncStorage.setItem(STORAGE_KEYS.PLAYER_STATS, JSON.stringify(stats));
  
  return stats;
}

/**
 * Save current game session
 */
export async function saveGameSession(session: GameSession): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
  } catch (error) {
    console.error('Error saving game session:', error);
  }
}

/**
 * Load current game session
 */
export async function loadGameSession(): Promise<GameSession | null> {
  try {
    const session = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error loading game session:', error);
    return null;
  }
}

/**
 * Clear current game session
 */
export async function clearGameSession(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
  } catch (error) {
    console.error('Error clearing game session:', error);
  }
}

/**
 * Reset all player data
 */
export async function resetAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.PLAYER_STATS,
      STORAGE_KEYS.CURRENT_SESSION,
    ]);
  } catch (error) {
    console.error('Error resetting data:', error);
  }
}

/**
 * Check if player has a streak today
 */
export async function hasStreakToday(): Promise<boolean> {
  const stats = await getPlayerStats();
  if (!stats.lastPlayedDate) return false;
  
  const lastDate = new Date(stats.lastPlayedDate);
  const today = new Date();
  
  return (
    lastDate.getFullYear() === today.getFullYear() &&
    lastDate.getMonth() === today.getMonth() &&
    lastDate.getDate() === today.getDate()
  );
}

/**
 * Get streak status message
 */
export async function getStreakMessage(): Promise<string> {
  const stats = await getPlayerStats();
  
  if (stats.currentStreak === 0) {
    return 'Start your streak today!';
  }
  
  if (stats.currentStreak === 1) {
    return '🔥 1 day streak! Keep it up!';
  }
  
  return `🔥 ${stats.currentStreak} day streak! Amazing!`;
}
