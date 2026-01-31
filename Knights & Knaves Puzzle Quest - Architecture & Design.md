# Knights & Knaves Puzzle Quest - Architecture & Design

## System Overview

This is a competitive logic puzzle game built with React Native and Expo, featuring a chess-like competitive structure with Duolingo-style streak tracking and Crossy Road-inspired cartoon aesthetics.

## Architecture Layers

### 1. Presentation Layer (UI Components)

#### Main Screens
- **HomeScreen** (`app/(tabs)/index.tsx`): Game entry point, manages screen navigation
- **ProfileScreen** (`app/(tabs)/profile.tsx`): Player statistics and achievements

#### Game Components
- **ModeSelection** (`components/ModeSelection.tsx`): Game mode and customization picker
- **GameContainer** (`components/GameContainer.tsx`): Game orchestration and state management
- **GameScreen** (`components/GameScreen.tsx`): Active puzzle display and interaction
- **GameResults** (`components/GameResults.tsx`): Results display and feedback

### 2. Business Logic Layer

#### Puzzle Generation (`utils/puzzleGenerator.ts`)
```typescript
Key Functions:
- generatePuzzle() - Creates a single puzzle
- generatePuzzles() - Creates multiple puzzles for a session
- verifyAnswer() - Checks if answer is correct
- calculateScore() - Computes points based on performance
```

**Puzzle Structure:**
- Random Knight/Knave assignment
- Difficulty-based statement generation
- Time limits based on game mode
- Correct answer verification

#### Game State Management (`utils/gameState.ts`)
```typescript
Key Functions:
- getPlayerStats() - Retrieves player statistics
- updatePlayerStats() - Updates stats after game
- saveGameSession() - Persists current game
- loadGameSession() - Resumes saved game
- hasStreakToday() - Checks daily streak status
```

**Data Persistence:**
- AsyncStorage for local data
- Player statistics
- Game history (last 100 games)
- Current session state

### 3. Animation Layer (`utils/animations.ts`)

Reusable animation utilities:
- Bounce animations for playful entrance
- Pulse animations for attention
- Shake animations for errors
- Flip animations for card reveals
- Slide and fade animations for transitions
- Success pop animations for celebrations

### 4. Theme & Styling (`constants/cartoonTheme.ts`)

**Color Palette:**
- Primary: #4ECDC4 (Teal)
- Secondary: #FFE66D (Yellow)
- Accent: #FF6B6B (Coral)
- Success: #95E1D3 (Mint)
- Background: #F8F9FA (Light Gray)

**Design System:**
- Border radius: 8px, 12px, 16px, 24px
- Spacing: 4px, 8px, 12px, 16px, 24px, 32px
- Shadow definitions for depth
- Character emoji pool for variety

## Data Flow

### Game Session Flow
```
HomeScreen
  ↓
ModeSelection (User selects mode, difficulty, characters)
  ↓
GameContainer (Initializes game session)
  ↓
GameScreen (Displays puzzle, handles input)
  ↓
GameResults (Shows results, updates stats)
  ↓
ProfileScreen (Displays updated statistics)
```

### State Management Flow
```
User Input
  ↓
GameContainer receives answer
  ↓
puzzleGenerator.verifyAnswer()
  ↓
Calculate score
  ↓
Update local state
  ↓
Display feedback
  ↓
gameState.updatePlayerStats()
  ↓
AsyncStorage persists data
```

## Game Modes

### Mode Configuration
```typescript
interface GameMode {
  mode: 'slow' | 'rapid' | 'blitz'
  timePerPuzzle: 60 | 30 | 10  // seconds
  difficulty: 'easy' | 'medium' | 'hard'
  numCharacters: 2 | 3 | 4 | 5
}
```

### Difficulty Scaling
- **Easy**: 2 characters, simple statements, 30s
- **Medium**: 3-4 characters, complex logic, 45s
- **Hard**: 4-5 characters, advanced reasoning, 60s

## Puzzle Generation Algorithm

1. **Character Selection**
   - Randomly select N characters from pool
   - Assign unique names and emojis

2. **Type Assignment**
   - Randomly assign Knight or Knave to each
   - Ensure at least one Knight (truth-teller)

3. **Statement Generation**
   - Select template based on difficulty
   - Fill in character names
   - Ensure logical consistency

4. **Verification**
   - Determine correct answer (Knight)
   - Store for validation

## Scoring System

### Base Points
- Easy: 10 points
- Medium: 25 points
- Hard: 50 points

### Time Bonus
- Formula: `(timeLimit - timeSpent) / timeLimit * baseScore`
- Rewards quick correct answers
- Maximum 50% bonus

### Streak Multiplier
- Consecutive wins increase streak
- Streak resets on any loss
- Visual feedback with fire emoji 🔥

## Player Statistics

### Tracked Metrics
```typescript
interface PlayerStats {
  totalGamesPlayed: number
  totalScore: number
  currentStreak: number
  longestStreak: number
  bestScores: {
    slow: number
    rapid: number
    blitz: number
  }
  lastPlayedDate: string
  gameHistory: GameRecord[]
}
```

### Game Record
```typescript
interface GameRecord {
  id: string
  mode: GameMode
  difficulty: 'easy' | 'medium' | 'hard'
  score: number
  correct: number
  total: number
  timeSpent: number
  date: string
}
```

## UI/UX Design Principles

### Cartoon Aesthetic
- Bright, vibrant colors
- Rounded corners (12px-16px)
- Playful animations
- Emoji-based characters
- Friendly typography

### Interaction Feedback
- Button press animations (scale down)
- Correct answer: Green highlight + checkmark
- Incorrect answer: Red highlight + X mark
- Time running out: Red timer
- Success: Pop animation + celebration emoji

### Responsive Design
- Flexible layouts for different screen sizes
- Touch-friendly button sizes (48px minimum)
- Readable text sizes (14px-28px)
- Safe area awareness

## Performance Optimizations

1. **Lazy Loading**: Components load on demand
2. **Animation Performance**: Native driver for animations
3. **State Optimization**: Minimal re-renders
4. **Storage**: Efficient AsyncStorage usage
5. **Memory**: Puzzle history limited to 100 games

## Error Handling

### User Input Validation
- Ensure valid game mode selection
- Validate character count (2-5)
- Check difficulty selection

### Data Integrity
- Verify puzzle correctness
- Validate score calculations
- Ensure streak consistency

### Recovery
- Reset all data option
- Session recovery on app restart
- Graceful error messages

## Testing Considerations

### Unit Tests (Recommended)
- Puzzle generation logic
- Score calculation
- Streak mechanics
- Data persistence

### Integration Tests
- Game flow end-to-end
- State transitions
- Data consistency

### UI Tests
- Component rendering
- User interactions
- Animation execution

## Extensibility

### Adding New Features
1. Create new component in `components/`
2. Add logic to `utils/`
3. Update navigation in `app/(tabs)/`
4. Add styling to `constants/cartoonTheme.ts`

### Customization Points
- Puzzle difficulty levels
- Game modes
- Character pool
- Color scheme
- Animation effects
- Scoring algorithm

## Dependencies

### Core
- `react-native`: UI framework
- `expo`: Development platform
- `expo-router`: Navigation
- `react-native-reanimated`: Advanced animations

### Storage
- `@react-native-async-storage/async-storage`: Data persistence

### Development
- `typescript`: Type safety
- `eslint`: Code quality

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

### Target Performance
- Initial load: < 3 seconds
- Puzzle display: < 500ms
- Answer verification: < 100ms
- Animation frame rate: 60 FPS

## Security Considerations

### Data Privacy
- All data stored locally
- No external API calls
- No user tracking
- No ads or analytics

### Input Validation
- Sanitize user selections
- Validate puzzle answers
- Check data types

## Future Architecture Improvements

1. **Backend Integration**
   - Cloud save sync
   - Multiplayer support
   - Global leaderboards

2. **Advanced Features**
   - Offline mode
   - Push notifications
   - Social sharing

3. **Performance**
   - Code splitting
   - Lazy loading
   - Asset optimization

4. **Analytics**
   - Local analytics
   - Performance monitoring
   - User behavior tracking

---

This architecture provides a solid foundation for a competitive logic puzzle game with room for growth and enhancement.
