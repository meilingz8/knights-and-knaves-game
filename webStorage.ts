/**
 * Web Storage Adapter
 * Provides localStorage-based persistence for web platform
 */

import { PlayerStats, GameRecord } from './gameState';

const STORAGE_KEYS = {
  PLAYER_STATS: 'kk_player_stats',
  CURRENT_SESSION: 'kk_current_session',
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
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get player statistics from localStorage
 */
export function getPlayerStatsWeb(): PlayerStats {
  try {
    if (!isLocalStorageAvailable()) {
      return DEFAULT_STATS;
    }
    
    const stats = localStorage.getItem(STORAGE_KEYS.PLAYER_STATS);
    return stats ? JSON.parse(stats) : DEFAULT_STATS;
  } catch (error) {
    console.error('Error loading player stats from localStorage:', error);
    return DEFAULT_STATS;
  }
}

/**
 * Save player statistics to localStorage
 */
export function savePlayerStatsWeb(stats: PlayerStats): void {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('localStorage not available');
      return;
    }
    
    localStorage.setItem(STORAGE_KEYS.PLAYER_STATS, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving player stats to localStorage:', error);
  }
}

/**
 * Get current game session from localStorage
 */
export function getGameSessionWeb(): any {
  try {
    if (!isLocalStorageAvailable()) {
      return null;
    }
    
    const session = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error loading game session from localStorage:', error);
    return null;
  }
}

/**
 * Save game session to localStorage
 */
export function saveGameSessionWeb(session: any): void {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('localStorage not available');
      return;
    }
    
    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
  } catch (error) {
    console.error('Error saving game session to localStorage:', error);
  }
}

/**
 * Clear game session from localStorage
 */
export function clearGameSessionWeb(): void {
  try {
    if (!isLocalStorageAvailable()) {
      return;
    }
    
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
  } catch (error) {
    console.error('Error clearing game session from localStorage:', error);
  }
}

/**
 * Reset all data in localStorage
 */
export function resetAllDataWeb(): void {
  try {
    if (!isLocalStorageAvailable()) {
      return;
    }
    
    localStorage.removeItem(STORAGE_KEYS.PLAYER_STATS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
  } catch (error) {
    console.error('Error resetting data in localStorage:', error);
  }
}

/**
 * Export player data as JSON
 */
export function exportPlayerDataWeb(): string {
  try {
    const stats = getPlayerStatsWeb();
    return JSON.stringify(stats, null, 2);
  } catch (error) {
    console.error('Error exporting player data:', error);
    return '';
  }
}

/**
 * Import player data from JSON
 */
export function importPlayerDataWeb(jsonData: string): boolean {
  try {
    const stats = JSON.parse(jsonData) as PlayerStats;
    
    // Validate structure
    if (!stats.totalGamesPlayed || !stats.bestScores) {
      throw new Error('Invalid player data structure');
    }
    
    savePlayerStatsWeb(stats);
    return true;
  } catch (error) {
    console.error('Error importing player data:', error);
    return false;
  }
}

/**
 * Get storage usage info
 */
export function getStorageInfoWeb(): { used: number; available: number; percentage: number } {
  try {
    if (!isLocalStorageAvailable()) {
      return { used: 0, available: 0, percentage: 0 };
    }
    
    let used = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }
    
    // Rough estimate: localStorage typically allows 5-10MB
    const available = 5 * 1024 * 1024; // 5MB estimate
    const percentage = (used / available) * 100;
    
    return { used, available, percentage };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { used: 0, available: 0, percentage: 0 };
  }
}

/**
 * Create a backup of player data
 */
export function createBackupWeb(): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const stats = getPlayerStatsWeb();
  return `knights-knaves-backup-${timestamp}.json`;
}

/**
 * Download player data as file
 */
export function downloadPlayerDataWeb(): void {
  try {
    const data = exportPlayerDataWeb();
    const filename = createBackupWeb();
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } catch (error) {
    console.error('Error downloading player data:', error);
  }
}
