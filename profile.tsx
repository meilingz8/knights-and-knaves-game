import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { getPlayerStats, resetAllData } from '@/utils/gameState';

export default function ProfileScreen() {
  const [stats, setStats] = useState({
    totalGamesPlayed: 0,
    totalScore: 0,
    currentStreak: 0,
    longestStreak: 0,
    bestScores: { slow: 0, rapid: 0, blitz: 0 },
    lastPlayedDate: '',
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const playerStats = await getPlayerStats();
    setStats(playerStats);
  };

  const handleResetData = async () => {
    await resetAllData();
    setStats({
      totalGamesPlayed: 0,
      totalScore: 0,
      currentStreak: 0,
      longestStreak: 0,
      bestScores: { slow: 0, rapid: 0, blitz: 0 },
      lastPlayedDate: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Stats</Text>
          <Text style={styles.subtitle}>Track your progress</Text>
        </View>

        {/* Streak Section */}
        <View style={styles.streakSection}>
          <View style={styles.streakCard}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakLabel}>Current Streak</Text>
            <Text style={styles.streakValue}>{stats.currentStreak}</Text>
            <Text style={styles.streakUnit}>days</Text>
          </View>

          <View style={styles.streakCard}>
            <Text style={styles.streakEmoji}>🏆</Text>
            <Text style={styles.streakLabel}>Best Streak</Text>
            <Text style={styles.streakValue}>{stats.longestStreak}</Text>
            <Text style={styles.streakUnit}>days</Text>
          </View>
        </View>

        {/* Overall Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Overall Statistics</Text>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Games</Text>
            <Text style={styles.statValue}>{stats.totalGamesPlayed}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Score</Text>
            <Text style={styles.statValue}>{stats.totalScore}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Average Score</Text>
            <Text style={styles.statValue}>
              {stats.totalGamesPlayed > 0
                ? Math.round(stats.totalScore / stats.totalGamesPlayed)
                : 0}
            </Text>
          </View>

          {stats.lastPlayedDate && (
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Last Played</Text>
              <Text style={styles.statValue}>
                {new Date(stats.lastPlayedDate).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        {/* Best Scores by Mode */}
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Best Scores by Mode</Text>

          <View style={styles.modeScoresContainer}>
            <View style={styles.modeScoreCard}>
              <Text style={styles.modeScoreIcon}>🐢</Text>
              <Text style={styles.modeScoreName}>Slow</Text>
              <Text style={styles.modeScoreValue}>{stats.bestScores.slow}</Text>
            </View>

            <View style={styles.modeScoreCard}>
              <Text style={styles.modeScoreIcon}>🐇</Text>
              <Text style={styles.modeScoreName}>Rapid</Text>
              <Text style={styles.modeScoreValue}>{stats.bestScores.rapid}</Text>
            </View>

            <View style={styles.modeScoreCard}>
              <Text style={styles.modeScoreIcon}>⚡</Text>
              <Text style={styles.modeScoreName}>Blitz</Text>
              <Text style={styles.modeScoreValue}>{stats.bestScores.blitz}</Text>
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.cardTitle}>Pro Tips</Text>
          <Text style={styles.tipText}>
            💡 Play daily to build your streak and master logic puzzles!
          </Text>
          <Text style={styles.tipText}>
            🧠 Start with Easy mode to understand the patterns.
          </Text>
          <Text style={styles.tipText}>
            ⚡ Try Blitz mode once you're confident in your skills.
          </Text>
          <Text style={styles.tipText}>
            🎯 Remember: Knights always tell the truth, Knaves always lie!
          </Text>
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetData}
        >
          <Text style={styles.resetButtonText}>Reset All Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  streakSection: {
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
  streakValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#4ECDC4',
  },
  streakUnit: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  statsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
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
    fontSize: 16,
    fontWeight: '700',
    color: '#4ECDC4',
  },
  modeScoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  modeScoreCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  modeScoreIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  modeScoreName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  modeScoreValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4ECDC4',
  },
  tipsCard: {
    backgroundColor: '#FFE66D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  tipText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
});
