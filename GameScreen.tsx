import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { Puzzle, Character } from '@/utils/puzzleGenerator';

interface GameScreenProps {
  puzzle: Puzzle;
  onSelectAnswer: (characterId: number) => void;
  isAnswered: boolean;
  isCorrect: boolean | null;
  timeRemaining: number;
}

const { width } = Dimensions.get('window');

export function GameScreen({
  puzzle,
  onSelectAnswer,
  isAnswered,
  isCorrect,
  timeRemaining,
}: GameScreenProps) {
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (isAnswered) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isAnswered]);

  const timeColor = timeRemaining < 10 ? '#FF6B6B' : '#4ECDC4';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header with score and time */}
      <View style={styles.header}>
        <View style={[styles.timer, { backgroundColor: timeColor }]}>
          <Text style={styles.timerText}>⏱️ {timeRemaining}s</Text>
        </View>
      </View>

      {/* Statement */}
      <View style={styles.statementContainer}>
        <Text style={styles.statementLabel}>The Statement:</Text>
        <View style={styles.statementBox}>
          <Text style={styles.statement}>{puzzle.statement}</Text>
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Who is telling the truth?</Text>
      </View>

      {/* Character Options */}
      <View style={styles.charactersContainer}>
        {puzzle.characters.map((character) => (
          <CharacterButton
            key={character.id}
            character={character}
            onPress={() => onSelectAnswer(character.id)}
            isSelected={isAnswered}
            isCorrect={isCorrect}
            isCorrectAnswer={character.id === puzzle.correctAnswer}
            disabled={isAnswered}
          />
        ))}
      </View>

      {/* Feedback */}
      {isAnswered && (
        <View
          style={[
            styles.feedbackContainer,
            isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
          ]}
        >
          <Text style={styles.feedbackText}>
            {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
          </Text>
          <Text style={styles.feedbackSubtext}>
            {isCorrect
              ? 'Great logic! You found the truth-teller!'
              : 'The truth-teller was ' +
                puzzle.characters.find((c) => c.id === puzzle.correctAnswer)?.name}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

interface CharacterButtonProps {
  character: Character;
  onPress: () => void;
  isSelected: boolean;
  isCorrect: boolean | null;
  isCorrectAnswer: boolean;
  disabled: boolean;
}

function CharacterButton({
  character,
  onPress,
  isSelected,
  isCorrect,
  isCorrectAnswer,
  disabled,
}: CharacterButtonProps) {
  const [pressAnim] = useState(new Animated.Value(1));

  const handlePress = () => {
    if (!disabled) {
      Animated.sequence([
        Animated.timing(pressAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pressAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      onPress();
    }
  };

  let buttonStyle = styles.characterButton;
  let backgroundColor = '#FFE66D';

  if (isSelected) {
    if (isCorrectAnswer) {
      backgroundColor = '#95E1D3';
      buttonStyle = [buttonStyle, styles.correctButton];
    } else if (isCorrect === false) {
      backgroundColor = '#FF6B6B';
      buttonStyle = [buttonStyle, styles.incorrectButton];
    }
  }

  return (
    <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
      <TouchableOpacity
        style={[buttonStyle, { backgroundColor }]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={styles.characterEmoji}>{character.emoji}</Text>
        <Text style={styles.characterName}>{character.name}</Text>
        {isSelected && isCorrectAnswer && (
          <Text style={styles.checkmark}>✓</Text>
        )}
        {isSelected && !isCorrectAnswer && isCorrect === false && (
          <Text style={styles.checkmark}>✗</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  timer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#4ECDC4',
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  statementContainer: {
    marginBottom: 24,
  },
  statementLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  statementBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statement: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    lineHeight: 26,
  },
  questionContainer: {
    marginBottom: 24,
  },
  question: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  charactersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  characterButton: {
    width: (width - 48) / 2,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  correctButton: {
    borderWidth: 3,
    borderColor: '#27AE60',
  },
  incorrectButton: {
    borderWidth: 3,
    borderColor: '#C0392B',
  },
  characterEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  characterName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  correctFeedback: {
    backgroundColor: '#D4EDDA',
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
  },
  incorrectFeedback: {
    backgroundColor: '#F8D7DA',
    borderLeftWidth: 4,
    borderLeftColor: '#C0392B',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  feedbackSubtext: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
