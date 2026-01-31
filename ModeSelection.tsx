import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { GameMode } from '@/utils/puzzleGenerator';

interface ModeSelectionProps {
  onStartGame: (mode: GameMode, difficulty: 'easy' | 'medium' | 'hard', numCharacters: number) => void;
  streak: number;
  onBack?: () => void;
}

const { width } = Dimensions.get('window');

interface GameModeConfig {
  mode: GameMode;
  name: string;
  description: string;
  icon: string;
  timePerPuzzle: number;
  color: string;
}

const GAME_MODES: GameModeConfig[] = [
  {
    mode: 'slow',
    name: 'Slow Chess',
    description: 'Take your time to think',
    icon: '🐢',
    timePerPuzzle: 60,
    color: '#A8E6CF',
  },
  {
    mode: 'rapid',
    name: 'Rapid',
    description: 'Medium pace challenge',
    icon: '🐇',
    timePerPuzzle: 30,
    color: '#FFD3B6',
  },
  {
    mode: 'blitz',
    name: 'Blitz',
    description: 'Lightning fast!',
    icon: '⚡',
    timePerPuzzle: 10,
    color: '#FF8B94',
  },
];

const DIFFICULTIES = [
  { level: 'easy' as const, name: 'Easy', emoji: '😊' },
  { level: 'medium' as const, name: 'Medium', emoji: '🤔' },
  { level: 'hard' as const, name: 'Hard', emoji: '🧠' },
];

const CHARACTER_COUNTS = [2, 3, 4, 5];

export function ModeSelection({ onStartGame, streak, onBack }: ModeSelectionProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [selectedCharacters, setSelectedCharacters] = useState(2);
  const [showCustomization, setShowCustomization] = useState(false);

  const handleStartGame = () => {
    if (selectedMode) {
      onStartGame(selectedMode, selectedDifficulty, selectedCharacters);
      setShowCustomization(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Knights & Knaves</Text>
        <Text style={styles.subtitle}>Puzzle Quest</Text>
        {streak > 0 && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {streak} day streak!</Text>
          </View>
        )}
      </View>

      {/* Game Modes */}
      <Text style={styles.sectionTitle}>Select Game Mode</Text>
      <View style={styles.modesContainer}>
        {GAME_MODES.map((gameMode) => (
          <TouchableOpacity
            key={gameMode.mode}
            style={[
              styles.modeCard,
              { backgroundColor: gameMode.color },
              selectedMode === gameMode.mode && styles.selectedModeCard,
            ]}
            onPress={() => {
              setSelectedMode(gameMode.mode);
              setShowCustomization(true);
            }}
          >
            <Text style={styles.modeIcon}>{gameMode.icon}</Text>
            <Text style={styles.modeName}>{gameMode.name}</Text>
            <Text style={styles.modeDescription}>{gameMode.description}</Text>
            <Text style={styles.modeTime}>{gameMode.timePerPuzzle}s per puzzle</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Customization Modal */}
      <Modal
        visible={showCustomization}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCustomization(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Customize Game</Text>
              <TouchableOpacity onPress={() => setShowCustomization(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Difficulty Selection */}
              <View style={styles.customizationSection}>
                <Text style={styles.customizationLabel}>Difficulty</Text>
                <View style={styles.optionsContainer}>
                  {DIFFICULTIES.map((diff) => (
                    <TouchableOpacity
                      key={diff.level}
                      style={[
                        styles.optionButton,
                        selectedDifficulty === diff.level && styles.selectedOption,
                      ]}
                      onPress={() => setSelectedDifficulty(diff.level)}
                    >
                      <Text style={styles.optionEmoji}>{diff.emoji}</Text>
                      <Text style={styles.optionText}>{diff.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Character Count Selection */}
              <View style={styles.customizationSection}>
                <Text style={styles.customizationLabel}>Number of Characters</Text>
                <View style={styles.optionsContainer}>
                  {CHARACTER_COUNTS.map((count) => (
                    <TouchableOpacity
                      key={count}
                      style={[
                        styles.optionButton,
                        selectedCharacters === count && styles.selectedOption,
                      ]}
                      onPress={() => setSelectedCharacters(count)}
                    >
                      <Text style={styles.optionText}>{count} Characters</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Preview */}
              <View style={styles.previewContainer}>
                <Text style={styles.previewLabel}>Game Preview</Text>
                <View style={styles.previewBox}>
                  <Text style={styles.previewText}>
                    Mode: {selectedMode?.toUpperCase()}
                  </Text>
                  <Text style={styles.previewText}>
                    Difficulty: {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
                  </Text>
                  <Text style={styles.previewText}>
                    Characters: {selectedCharacters}
                  </Text>
                </View>
              </View>
            </ScrollView>

            {/* Start Button */}
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartGame}
            >
              <Text style={styles.startButtonText}>Start Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>How to Play</Text>
        <Text style={styles.instructionText}>
          🎯 Knights always tell the truth. Knaves always lie.
        </Text>
        <Text style={styles.instructionText}>
          🧩 Read the statement and identify who is telling the truth.
        </Text>
        <Text style={styles.instructionText}>
          ⚡ Beat the clock to earn bonus points!
        </Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  streakBadge: {
    backgroundColor: '#FFE66D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  modesContainer: {
    marginBottom: 32,
  },
  modeCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedModeCard: {
    borderColor: '#333',
    borderWidth: 3,
  },
  modeIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  modeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  modeTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#999',
    fontWeight: '600',
  },
  modalBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  customizationSection: {
    marginBottom: 24,
  },
  customizationLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#4ECDC4',
    borderColor: '#333',
  },
  optionEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  previewContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  previewBox: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  previewText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  instructionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFE66D',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});
