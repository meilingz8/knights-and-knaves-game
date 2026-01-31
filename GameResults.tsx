import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { GameRecord } from '@/utils/gameState';

interface GameResultsProps {
  record: GameRecord;
  streak: number;
  longestStreak: number;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const { width } = Dimensions.get('window');

export function GameResults({
  record,
  streak,
  longestStreak,
  onPlayAgain,
  onBackToMenu,
}: GameResultsProps) {
  const accuracy = Math.round((record.correct / record.total) * 100);
  const isWin = record.correct === record.total;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Result Header */}
      <View style={[styles.resultHeader, isWin ? styles.winHeader : styles.lossHeader]}>
        <Text style={styles.resultEmoji}>{isWin ? '🎉' : '💪'}</Text>
        <Text style={styles.resultTitle}>{isWin ? 'Perfect!' : 'Good Try!'}</Text>
        <Text style={styles.resultSubtitle}>
          {isWin ? 'You got them all right!' : 'Keep practicing!'}
        </Text>
      </View>

      {/* Score Card */}
      <View style={styles.scoreCard}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{record.score}</Text>
        </View>
        <View style={styles.scoreDivider} />
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Accuracy</Text>
          <Text style={styles.scoreValue}>{accuracy}%</Text>
        </View>
        <View style={styles.scoreDivider} />
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Correct</Text>
          <Text style={styles.scoreValue}>
            {record.correct}/{record.total}
          </Text>
        </View>
      </View>

      {/* Game Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Game Stats</Text>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Mode</Text>
          <Text style={styles.statValue}>{record.mode.toUpperCase()}</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Difficulty</Text>
          <Text style={styles.statValue}>
            {record.difficulty.charAt(0).toUpperCase() + record.difficulty.slice(1)}
          </Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Time Spent</Text>
          <Text style={styles.statValue}>{record.timeSpent}s</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Date</Text>
          <Text style={styles.statValue}>
            {new Date(record.date).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Streak Info */}
      <View style={styles.streakContainer}>
        <View style={styles.streakCard}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakLabel}>Current Streak</Text>
          <Text style={styles.streakNumber}>{streak}</Text>
          <Text style={styles.streakDays}>days</Text>
        </View>

        <View style={styles.streakCard}>
          <Text style={styles.streakEmoji}>🏆</Text>
          <Text style={styles.streakLabel}>Best Streak</Text>
          <Text style={styles.streakNumber}>{longestStreak}</Text>
          <Text style={styles.streakDays}>days</Text>
        </View>
      </View>

      {/* Motivational Message */}
      <View style={styles.motivationContainer}>
        <Text style={styles.motivationText}>
          {isWin
            ? '🌟 Keep this streak alive! Play again tomorrow!'
            : '📈 Each puzzle makes you smarter. Try again!'}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.playAgainButton}
          onPress={onPlayAgain}
        >
          <Text style={styles.playAgainButtonText}>Play Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={onBackToMenu}
        >
          <Text style={styles.menuButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  resultHeader: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  winHeader: {
    backgroundColor: '#D4EDDA',
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
  },
  lossHeader: {
    backgroundColor: '#FFF3CD',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  scoreCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    flexDirection: 'row',
    paddingVertical: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreItem: {
    flex: 1,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4ECDC4',
  },
  scoreDivider: {
    width: 1,
    backgroundColor: '#EEE',
  },
  statsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  streakCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  streakLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#4ECDC4',
  },
  streakDays: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  motivationContainer: {
    backgroundColor: '#FFE66D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  motivationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonsContainer: {
    gap: 12,
  },
  playAgainButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  playAgainButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  menuButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4ECDC4',
  },
});
