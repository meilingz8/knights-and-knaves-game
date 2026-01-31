import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { WebLanding } from '@/components/WebLanding';
import { ModeSelection } from '@/components/ModeSelection';
import { GameContainer } from '@/components/GameContainer';
import {
  getPlayerStats,
  updatePlayerStats,
  hasStreakToday,
  GameRecord,
} from '@/utils/gameState';
import { GameMode } from '@/utils/puzzleGenerator';

type GameScreen = 'landing' | 'menu' | 'game' | 'results';

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('landing');
  const [gameMode, setGameMode] = useState<GameMode>('rapid');
  const [gameDifficulty, setGameDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [numCharacters, setNumCharacters] = useState(2);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Load player stats on mount
  useEffect(() => {
    loadPlayerStats();
  }, []);

  const loadPlayerStats = async () => {
    const stats = await getPlayerStats();
    setStreak(stats.currentStreak);
    setLongestStreak(stats.longestStreak);
  };

  const handlePlayNow = () => {
    setCurrentScreen('menu');
  };

  const handleStartGame = (mode: GameMode, difficulty: 'easy' | 'medium' | 'hard', characters: number) => {
    setGameMode(mode);
    setGameDifficulty(difficulty);
    setNumCharacters(characters);
    setCurrentScreen('game');
  };

  const handleGameEnd = async (record: GameRecord) => {
    // Determine if the game was a win (all correct)
    const isWin = record.correct === record.total;
    
    // Update player stats
    const updatedStats = await updatePlayerStats(record, isWin);
    setStreak(updatedStats.currentStreak);
    setLongestStreak(updatedStats.longestStreak);
    
    setCurrentScreen('results');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'landing' && (
        <WebLanding onPlayNow={handlePlayNow} />
      )}
      {currentScreen === 'menu' && (
        <ModeSelection 
          onStartGame={handleStartGame} 
          streak={streak}
          onBack={handleBackToLanding}
        />
      )}
      {currentScreen === 'game' && (
        <GameContainer
          mode={gameMode}
          difficulty={gameDifficulty}
          numCharacters={numCharacters}
          onGameEnd={handleGameEnd}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});
