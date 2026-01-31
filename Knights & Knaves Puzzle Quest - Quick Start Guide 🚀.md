# Knights & Knaves Puzzle Quest - Quick Start Guide 🚀

## What You Just Built

A competitive mobile game featuring the classic **Knights and Knaves** logic puzzle with:
- ✅ 3 game modes (Slow, Rapid, Blitz) like chess
- ✅ Customizable difficulty and character count
- ✅ Duolingo-style streak tracking system
- ✅ Cute cartoon aesthetic (Crossy Road vibes)
- ✅ Player stats and profile tracking
- ✅ Smooth animations and responsive UI

## Getting Started

### 1. Install Dependencies
```bash
cd knights-and-knaves-game
pnpm install
```

### 2. Run the Game

**For Web Browser:**
```bash
pnpm run web
```
Then open http://localhost:8081 in your browser

**For Android:**
```bash
pnpm run android
```

**For iOS (macOS only):**
```bash
pnpm run ios
```

## Game Features Overview

### 🎮 Game Modes
| Mode | Time/Puzzle | Best For |
|------|-------------|----------|
| 🐢 Slow | 60 seconds | Careful thinking |
| 🐇 Rapid | 30 seconds | Balanced play |
| ⚡ Blitz | 10 seconds | Speed challenges |

### 🎯 Customization
- **Difficulty**: Easy → Medium → Hard
- **Characters**: 2 to 5 characters per puzzle
- **Adaptive Puzzles**: Statements get harder with difficulty

### 🔥 Streak System
- Play daily to build your streak
- Track your best streak ever
- Earn bonus points for consistency

### 📊 Player Stats
- Total games played
- Total score and average
- Best scores per mode
- Game history (last 100 games)

## Project Structure

```
knights-and-knaves-game/
├── app/(tabs)/
│   ├── index.tsx          ← Main game screen
│   ├── profile.tsx        ← Stats and achievements
│   └── _layout.tsx        ← Navigation setup
├── components/
│   ├── GameScreen.tsx     ← Game UI
│   ├── GameContainer.tsx  ← Game logic
│   ├── GameResults.tsx    ← Results screen
│   └── ModeSelection.tsx  ← Mode picker
├── utils/
│   ├── puzzleGenerator.ts ← Puzzle creation
│   ├── gameState.ts       ← Data persistence
│   └── animations.ts      ← Animation effects
├── constants/
│   └── cartoonTheme.ts    ← Colors and theme
└── package.json
```

## Key Game Logic

### How Puzzles Work
1. **Random Assignment**: Each character is randomly a Knight or Knave
2. **Statement Generation**: Creates logical statements based on difficulty
3. **Verification**: Checks if your answer is correct
4. **Scoring**: Awards points based on speed and difficulty

### Streak Mechanics
- Win a game (all correct) → Streak increases by 1
- Lose a game (any incorrect) → Streak resets to 0
- Play daily to maintain your streak

## Customization Options

### Easy Mode
- 2 characters
- Simple statements like "I am a knight"
- 30 seconds per puzzle

### Medium Mode
- 3-4 characters
- Complex logic statements
- 45 seconds per puzzle

### Hard Mode
- 4-5 characters
- Advanced reasoning required
- 60 seconds per puzzle

## Color Scheme (Cartoon Theme)

- **Teal** (#4ECDC4): Primary actions
- **Yellow** (#FFE66D): Highlights and streaks
- **Coral** (#FF6B6B): Errors and warnings
- **Mint** (#95E1D3): Success and correct answers
- **Light Gray** (#F8F9FA): Background

## Animations & Effects

- ✨ Bounce animations on entrance
- 🎯 Scale effects on button press
- 🔄 Smooth transitions between screens
- ✅ Success pop animation for correct answers
- ❌ Shake effect for errors

## Data Persistence

All player data is saved locally using AsyncStorage:
- Game history
- Streaks
- Best scores
- Statistics

Data persists even after closing the app!

## Tips for Playing

1. **Start Easy**: Learn the puzzle patterns first
2. **Read Carefully**: Pay attention to logical contradictions
3. **Think Fast**: Bonus points for quick correct answers
4. **Build Streaks**: Play daily for consistency
5. **Challenge Yourself**: Try harder modes once comfortable

## Development Tips

### Adding New Features
1. Create components in `components/`
2. Add logic to `utils/`
3. Update screens in `app/(tabs)/`
4. Test on both web and mobile

### Modifying Puzzles
- Edit `utils/puzzleGenerator.ts`
- Add new statement templates
- Adjust difficulty levels

### Changing Theme
- Edit `constants/cartoonTheme.ts`
- Update colors and spacing
- Modify animations in `utils/animations.ts`

## Troubleshooting

**Game won't load?**
- Clear cache: `pnpm run reset-project`
- Restart server: Kill and rerun `pnpm run web`

**Streak not saving?**
- Complete all puzzles in a game
- Check device storage permissions

**Performance issues?**
- Reduce animation complexity
- Close other apps
- Clear app cache

## Next Steps

1. ✅ Test the game in your browser
2. ✅ Try all game modes
3. ✅ Build a streak
4. ✅ Customize difficulty and character count
5. ✅ Share with friends!

## Future Enhancement Ideas

- 🌐 Multiplayer mode
- 🏆 Global leaderboards
- 🎵 Sound effects and music
- 🎨 Character customization
- ⭐ Achievement badges
- 🎁 Daily challenges
- 💪 Power-ups

## Need Help?

Check `GAME_README.md` for detailed documentation or review the code comments in:
- `utils/puzzleGenerator.ts` - Game logic
- `components/GameContainer.tsx` - Game flow
- `utils/gameState.ts` - Data management

---

**Have fun playing and building your streak! 🔥**
