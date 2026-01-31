/**
 * Cartoon Theme Colors and Styles
 * Inspired by Crossy Road's cute aesthetic
 */

export const CartoonTheme = {
  // Primary colors - bright and playful
  primary: '#4ECDC4',      // Teal/Turquoise
  secondary: '#FFE66D',    // Sunny yellow
  accent: '#FF6B6B',       // Coral red
  
  // Success and feedback
  success: '#95E1D3',      // Mint green
  error: '#FF6B6B',        // Coral red
  warning: '#FFD3B6',      // Peach
  
  // Backgrounds
  background: '#F8F9FA',   // Light gray
  surface: '#FFFFFF',      // White
  
  // Text colors
  text: {
    primary: '#333333',    // Dark gray
    secondary: '#666666',  // Medium gray
    tertiary: '#999999',   // Light gray
    light: '#CCCCCC',      // Very light gray
  },
  
  // Gradients (for future use)
  gradients: {
    primary: ['#4ECDC4', '#44A08D'],
    secondary: ['#FFE66D', '#FFC107'],
    accent: ['#FF6B6B', '#E74C3C'],
    success: ['#95E1D3', '#27AE60'],
  },
  
  // Shadow
  shadow: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    heavy: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
  },
  
  // Border radius for rounded corners
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  
  // Character emojis for variety
  characterEmojis: [
    '🌙', '☀️', '💨', '✨', '🌬️',
    '😄', '⚡', '🔥', '🫧', '⭐',
    '🎈', '🎪', '🎭', '🎨', '🎯',
  ],
};

export const CartoonColors = {
  // Pastel palette
  pastelBlue: '#A8E6CF',
  pastelPeach: '#FFD3B6',
  pastelPink: '#FF8B94',
  pastelYellow: '#FFE66D',
  pastelGreen: '#95E1D3',
  pastelPurple: '#C7CEEA',
  
  // Bright palette
  brightBlue: '#4ECDC4',
  brightOrange: '#FF6B6B',
  brightGreen: '#27AE60',
  brightYellow: '#FFC107',
  brightPurple: '#9B59B6',
  brightPink: '#E91E63',
};

export type ThemeType = typeof CartoonTheme;
