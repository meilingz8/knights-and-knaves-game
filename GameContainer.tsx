import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  generatePuzzles,
  GameSession,
  GameMode,
  verifyAnswer,
  calculateScore,
} from '@/utils/puzzleGenerator';
import { GameScreen } from './GameScreen';
import { GameResults } from './GameResults';
import { updatePlayerStats, GameRecord } from '@/utils/gameState';

interface GameContainerProps {
  mode: GameMode;
  difficulty: 'easy' | 'medium' | 'hard';
  numCharacters: number;
  onGameEnd: (record: GameRecord) => void;
  onBackToMenu: () => void;
}

const PUZZLES_PER_GAME = 5;

export function GameContainer({
  mode,
  difficulty,
  numCharacters,
  onGameEnd,
  onBackToMenu,
}: GameContainerProps) {
  const [gameState, setGameState] = useState<'loading' | 'playing' | 'results'>('loading');
  const [session, setSession] = useState<GameSession | null>(null);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameRecord, setGameRecord] = useState<GameRecord | null>(null);

  // Initialize game
  useEffect(() => {
    const puzzles = generatePuzzles(PUZZLES_PER_GAME, difficulty, numCharacters);
    const newSession: GameSession = {
      id: `session-${Date.now()}`,
      mode,
      difficulty,
      numCharacters,
      puzzles,
      currentPuzzleIndex: 0,
      score: 0,
      streak: 0,
      startTime: Date.now(),
    };
    setSession(newSession);
    setGameState('playing');
    setTimeRemaining(puzzles[0].timeLimit);
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing' || answered) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - auto-submit wrong answer
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, answered]);

  const handleTimeUp = () => {
    setAnswered(true);
    setIsCorrect(false);
    setScore((prev) => prev + 0); // No points for timeout
  };

  const handleSelectAnswer = (characterId: number) => {
    if (answered || !session) return;

    const puzzle = session.puzzles[currentPuzzleIndex];
    const correct = verifyAnswer(puzzle, characterId);
    const points = correct ? calculateScore(difficulty, PUZZLES_PER_GAME - timeRemaining, puzzle.timeLimit) : 0;

    setAnswered(true);
    setIsCorrect(correct);
    setScore((prev) => prev + points);
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }

    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (currentPuzzleIndex < PUZZLES_PER_GAME - 1) {
        setCurrentPuzzleIndex((prev) => prev + 1);
        setAnswered(false);
        setIsCorrect(null);
        if (session.puzzles[currentPuzzleIndex + 1]) {
          setTimeRemaining(session.puzzles[currentPuzzleIndex + 1].timeLimit);
        }
      } else {
        // Game finished
        finishGame();
      }
    }, 2000);
  };

  const finishGame = () => {
    const totalTime = Math.round((Date.now() - (session?.startTime || 0)) / 1000);
    const record: GameRecord = {
      id: `record-${Date.now()}`,
      mode,
      difficulty,
      score,
      correct: correctCount,
      total: PUZZLES_PER_GAME,
      timeSpent: totalTime,
      date: new Date().toISOString(),
    };

    setGameRecord(record);
    setGameState('results');
    onGameEnd(record);
  };

  if (!session) {
    return <View style={styles.container} />;
  }

  const currentPuzzle = session.puzzles[currentPuzzleIndex];

  if (gameState === 'playing') {
    return (
      <View style={styles.container}>
        <GameScreen
          puzzle={currentPuzzle}
          onSelectAnswer={handleSelectAnswer}
          isAnswered={answered}
          isCorrect={isCorrect}
          timeRemaining={timeRemaining}
        />
        
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            {Array.from({ length: PUZZLES_PER_GAME }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressDot,
                  i < currentPuzzleIndex && styles.completedDot,
                  i === currentPuzzleIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    );
  }

  if (gameState === 'results' && gameRecord) {
    return (
      <View style={styles.container}>
        <GameResults
          record={gameRecord}
          streak={0} // Will be updated from parent
          longestStreak={0} // Will be updated from parent
          onPlayAgain={() => {
            // Reset and play again with same settings
            setGameState('loading');
            setCurrentPuzzleIndex(0);
            setScore(0);
            setCorrectCount(0);
            setAnswered(false);
            setIsCorrect(null);
            const puzzles = generatePuzzles(PUZZLES_PER_GAME, difficulty, numCharacters);
            const newSession: GameSession = {
              id: `session-${Date.now()}`,
              mode,
              difficulty,
              numCharacters,
              puzzles,
              currentPuzzleIndex: 0,
              score: 0,
              streak: 0,
              startTime: Date.now(),
            };
            setSession(newSession);
            setGameState('playing');
            setTimeRemaining(puzzles[0].timeLimit);
          }}
          onBackToMenu={onBackToMenu}
        />
      </View>
    );
  }

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
  },
  completedDot: {
    backgroundColor: '#4ECDC4',
  },
  activeDot: {
    backgroundColor: '#FF6B6B',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
