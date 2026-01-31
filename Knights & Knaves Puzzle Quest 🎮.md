# Knights & Knaves Puzzle Quest 🎮

A competitive mobile game based on the famous logic puzzle "Knights and Knaves" with a cute cartoon aesthetic inspired by Crossy Road.

## 🎯 Game Concept

In the Knights and Knaves puzzle, you must identify who is telling the truth:
- **Knights** always tell the truth
- **Knaves** always lie

Your goal is to read their statements and determine which character is the truth-teller!

## ✨ Features

### Game Modes (Chess-like Structure)
- **🐢 Slow Mode**: 60 seconds per puzzle - Perfect for thinking deeply
- **🐇 Rapid Mode**: 30 seconds per puzzle - Balanced challenge
- **⚡ Blitz Mode**: 10 seconds per puzzle - Lightning-fast gameplay

### Customization
- **Difficulty Levels**: Easy, Medium, Hard
- **Character Count**: 2-5 characters per puzzle
- **Adaptive Puzzles**: Difficulty scales with your selection

### Streak System (Like Duolingo)
- 🔥 **Daily Streaks**: Build your streak by playing daily
- 🏆 **Best Streak**: Track your longest streak
- 📊 **Stats Tracking**: Monitor your progress over time

### Cute Cartoon Aesthetic
- Colorful character emojis (🌙, ☀️, ✨, ⚡, etc.)
- Smooth animations and transitions
- Playful UI with rounded corners and vibrant colors
- Responsive feedback for correct/incorrect answers

## 🎮 How to Play

1. **Select a Game Mode**: Choose between Slow, Rapid, or Blitz
2. **Customize Your Game**: Pick difficulty and number of characters
3. **Read the Statement**: Carefully analyze what each character says
4. **Make Your Choice**: Tap on the character you think is telling the truth
5. **Beat the Clock**: Earn bonus points for fast correct answers
6. **Build Your Streak**: Play daily to maintain your streak!

## 🏗️ Project Structure

```
knights-and-knaves-game/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx           # Home/Game screen
│   │   ├── profile.tsx         # Stats and profile screen
│   │   └── _layout.tsx         # Tab navigation
│   ├── _layout.tsx             # Root layout
│   └── modal.tsx               # Modal screens
├── components/
│   ├── GameScreen.tsx          # Main game UI
│   ├── GameContainer.tsx       # Game logic container
│   ├── GameResults.tsx         # Results screen
│   └── ModeSelection.tsx       # Mode selection UI
├── utils/
│   ├── puzzleGenerator.ts      # Puzzle generation logic
│   ├── gameState.ts            # Game state management
│   └── animations.ts           # Animation utilities
├── constants/
│   └── cartoonTheme.ts         # Theme and styling
└── package.json
```

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: AsyncStorage for persistence
- **Navigation**: Expo Router
- **Animations**: React Native Animated API
- **Styling**: React Native StyleSheet

## 📱 Installation & Setup

### Prerequisites
- Node.js 16+ and pnpm
- Expo CLI

### Installation

```bash
# Navigate to project directory
cd knights-and-knaves-game

# Install dependencies
pnpm install

# Start the development server
pnpm run web      # For web browser
pnpm run android  # For Android device/emulator
pnpm run ios      # For iOS device/emulator (macOS only)
```

## 🎨 Color Palette

The game uses a vibrant, cartoon-inspired color scheme:

- **Primary**: Teal (#4ECDC4) - Main interactive elements
- **Secondary**: Sunny Yellow (#FFE66D) - Highlights and badges
- **Accent**: Coral Red (#FF6B6B) - Errors and warnings
- **Success**: Mint Green (#95E1D3) - Correct answers
- **Background**: Light Gray (#F8F9FA) - Clean interface

## 🎯 Game Mechanics

### Puzzle Generation
- Randomly assigns Knight/Knave types to characters
- Generates logical statements based on difficulty
- Ensures one truth-teller per puzzle

### Scoring System
- **Base Points**: 10 (Easy), 25 (Medium), 50 (Hard)
- **Time Bonus**: Up to 50% additional points for fast answers
- **Streak Multiplier**: Bonus points for maintaining streaks

### Difficulty Scaling
- **Easy**: Simple statements, 2 characters
- **Medium**: Complex logic, 3-4 characters
- **Hard**: Advanced reasoning, 4-5 characters

## 📊 Player Statistics

The game tracks:
- Total games played
- Total score
- Current streak
- Longest streak
- Best scores per mode
- Game history (last 100 games)
- Last played date

All data is stored locally using AsyncStorage.

## 🎨 UI/UX Features

- **Smooth Animations**: Bounce, fade, and scale effects
- **Haptic Feedback**: Tactile responses to interactions
- **Progress Indicators**: Visual progress through puzzles
- **Motivational Messages**: Encouraging feedback based on performance
- **Responsive Design**: Works on phones and tablets

## 🚀 Future Enhancements

- Multiplayer competitive mode
- Online leaderboards
- Daily challenges
- Achievement badges
- Sound effects and music
- Character customization
- Power-ups and special modes
- Tutorial system

## 📝 Game Rules

1. **Knights** always tell the truth - everything they say is true
2. **Knaves** always lie - everything they say is false
3. Read the statement carefully
4. Determine which character is the truth-teller
5. Tap to select your answer
6. You have limited time based on game mode

## 💡 Tips for Players

- Start with Easy mode to understand the patterns
- Pay attention to logical contradictions
- Think about what each type would say in the situation
- Use the time wisely - rushing leads to mistakes
- Build your daily streak for consistent improvement
- Try different game modes to challenge yourself

## 🐛 Troubleshooting

### Game won't start
- Clear AsyncStorage: Use "Reset All Data" in Profile
- Restart the dev server: `pnpm run web`

### Performance issues
- Reduce animation complexity in settings
- Close other apps running on your device
- Clear app cache

### Streak not updating
- Ensure you complete the full game (all puzzles)
- Check that your device has internet for data sync

## 📄 License

This project is created for educational and entertainment purposes.

## 👨‍💻 Development

### Running Tests
```bash
pnpm run lint
```

### Building for Production
```bash
pnpm run build
```

## 🎓 Learning Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Knights and Knaves Logic Puzzles](https://en.wikipedia.org/wiki/Knights_and_Knaves)

## 🙏 Credits

Inspired by:
- The classic Knights and Knaves logic puzzle
- Crossy Road's cute aesthetic
- Duolingo's streak system

---

**Enjoy the game and keep your streak alive! 🔥**
