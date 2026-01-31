import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { CartoonTheme } from '@/constants/cartoonTheme';

interface WebLandingProps {
  onPlayNow: () => void;
}

const { width } = Dimensions.get('window');

export function WebLanding({ onPlayNow }: WebLandingProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🎮</Text>
          <Text style={styles.heroTitle}>Knights & Knaves</Text>
          <Text style={styles.heroSubtitle}>Puzzle Quest</Text>
          <Text style={styles.heroDescription}>
            A competitive logic puzzle game with a cute cartoon aesthetic
          </Text>
          <TouchableOpacity style={styles.playButton} onPress={onPlayNow}>
            <Text style={styles.playButtonText}>Play Now</Text>
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why You'll Love It</Text>
          
          <View style={styles.featureGrid}>
            <FeatureCard
              emoji="🐢"
              title="Multiple Modes"
              description="Slow, Rapid, and Blitz modes like chess"
            />
            <FeatureCard
              emoji="🔥"
              title="Streak System"
              description="Build daily streaks like Duolingo"
            />
            <FeatureCard
              emoji="🧩"
              title="Logic Puzzles"
              description="Knights always tell truth, Knaves always lie"
            />
            <FeatureCard
              emoji="🎨"
              title="Cute Design"
              description="Crossy Road-inspired cartoon aesthetic"
            />
            <FeatureCard
              emoji="📊"
              title="Track Stats"
              description="Monitor your progress and achievements"
            />
            <FeatureCard
              emoji="⚡"
              title="Challenge Yourself"
              description="Customizable difficulty and character count"
            />
          </View>
        </View>

        {/* How to Play Section */}
        <View style={styles.howToPlaySection}>
          <Text style={styles.sectionTitle}>How to Play</Text>
          
          <View style={styles.stepContainer}>
            <Step
              number="1"
              title="Select a Mode"
              description="Choose between Slow (60s), Rapid (30s), or Blitz (10s) per puzzle"
            />
            <Step
              number="2"
              title="Customize Your Game"
              description="Pick difficulty level and number of characters (2-5)"
            />
            <Step
              number="3"
              title="Read the Statement"
              description="Analyze what each character says carefully"
            />
            <Step
              number="4"
              title="Make Your Choice"
              description="Tap the character you think is telling the truth"
            />
            <Step
              number="5"
              title="Build Your Streak"
              description="Win games to build your daily streak"
            />
          </View>
        </View>

        {/* Game Modes Section */}
        <View style={styles.modesSection}>
          <Text style={styles.sectionTitle}>Game Modes</Text>
          
          <View style={styles.modesContainer}>
            <ModeCard
              icon="🐢"
              name="Slow Chess"
              time="60 seconds"
              description="Perfect for careful thinking and strategy"
              color={CartoonTheme.gradients.primary[0]}
            />
            <ModeCard
              icon="🐇"
              name="Rapid"
              time="30 seconds"
              description="Balanced pace for everyday play"
              color={CartoonTheme.gradients.secondary[0]}
            />
            <ModeCard
              icon="⚡"
              name="Blitz"
              time="10 seconds"
              description="Lightning-fast challenges for experts"
              color={CartoonTheme.gradients.accent[0]}
            />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Track Your Progress</Text>
          
          <View style={styles.statsGrid}>
            <StatCard emoji="🎮" label="Games Played" value="Track your total" />
            <StatCard emoji="⭐" label="Total Score" value="Earn points" />
            <StatCard emoji="🔥" label="Daily Streak" value="Build consistency" />
            <StatCard emoji="🏆" label="Best Streak" value="Your record" />
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Challenge Your Logic?</Text>
          <Text style={styles.ctaDescription}>
            No downloads needed. Play directly in your browser!
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={onPlayNow}>
            <Text style={styles.ctaButtonText}>Start Playing Now</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Knights & Knaves Puzzle Quest. Built with React Native & Expo.
          </Text>
          <Text style={styles.footerSubtext}>
            All data is saved locally on your device.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

interface StepProps {
  number: string;
  title: string;
  description: string;
}

function Step({ number, title, description }: StepProps) {
  return (
    <View style={styles.step}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
}

interface ModeCardProps {
  icon: string;
  name: string;
  time: string;
  description: string;
  color: string;
}

function ModeCard({ icon, name, time, description, color }: ModeCardProps) {
  return (
    <View style={[styles.modeCard, { backgroundColor: color }]}>
      <Text style={styles.modeIcon}>{icon}</Text>
      <Text style={styles.modeName}>{name}</Text>
      <Text style={styles.modeTime}>{time}</Text>
      <Text style={styles.modeDescription}>{description}</Text>
    </View>
  );
}

interface StatCardProps {
  emoji: string;
  label: string;
  value: string;
}

function StatCard({ emoji, label, value }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CartoonTheme.background,
  },
  content: {
    paddingBottom: 40,
  },
  heroSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: CartoonTheme.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 400,
  },
  playButton: {
    backgroundColor: CartoonTheme.secondary,
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: CartoonTheme.text.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    width: '48%',
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
  featureEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: CartoonTheme.text.primary,
    marginBottom: 6,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: CartoonTheme.text.secondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  howToPlaySection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#F8F9FA',
  },
  stepContainer: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CartoonTheme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: CartoonTheme.text.primary,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: CartoonTheme.text.secondary,
    lineHeight: 20,
  },
  modesSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  modesContainer: {
    gap: 16,
  },
  modeCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  modeIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  modeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  modeTime: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 8,
  },
  modeDescription: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#F8F9FA',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: '48%',
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
  statEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: CartoonTheme.text.secondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 12,
    color: CartoonTheme.text.tertiary,
    textAlign: 'center',
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: CartoonTheme.secondary,
    marginHorizontal: 20,
    borderRadius: 16,
    marginVertical: 20,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: CartoonTheme.primary,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  footerText: {
    fontSize: 12,
    color: CartoonTheme.text.secondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 11,
    color: CartoonTheme.text.tertiary,
    textAlign: 'center',
  },
});
