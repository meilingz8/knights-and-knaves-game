/**
 * Animation Utilities
 * Provides reusable animation configurations for Crossy Road-like feel
 */

import { Animated, Easing } from 'react-native';

/**
 * Bounce animation - playful entrance
 */
export function createBounceAnimation(
  animValue: Animated.Value,
  toValue: number = 1,
  duration: number = 500
) {
  return Animated.timing(animValue, {
    toValue,
    duration,
    easing: Easing.out(Easing.bounce),
    useNativeDriver: true,
  });
}

/**
 * Scale pulse animation - attention grabber
 */
export function createPulseAnimation(animValue: Animated.Value) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1.1,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 1,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ])
  );
}

/**
 * Shake animation - error feedback
 */
export function createShakeAnimation(animValue: Animated.Value) {
  return Animated.sequence([
    Animated.timing(animValue, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]);
}

/**
 * Flip animation - card reveal
 */
export function createFlipAnimation(animValue: Animated.Value, toValue: number = 1) {
  return Animated.timing(animValue, {
    toValue,
    duration: 300,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  });
}

/**
 * Slide in animation - screen entrance
 */
export function createSlideInAnimation(
  animValue: Animated.Value,
  fromValue: number = 100,
  duration: number = 400
) {
  animValue.setValue(fromValue);
  return Animated.timing(animValue, {
    toValue: 0,
    duration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });
}

/**
 * Fade in animation - smooth entrance
 */
export function createFadeInAnimation(
  animValue: Animated.Value,
  duration: number = 300
) {
  animValue.setValue(0);
  return Animated.timing(animValue, {
    toValue: 1,
    duration,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  });
}

/**
 * Rotate animation - spinning effect
 */
export function createRotateAnimation(animValue: Animated.Value) {
  return Animated.loop(
    Animated.timing(animValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  );
}

/**
 * Success pop animation - celebration
 */
export function createSuccessPopAnimation(animValue: Animated.Value) {
  animValue.setValue(0.5);
  return Animated.sequence([
    Animated.spring(animValue, {
      toValue: 1.2,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
  ]);
}

/**
 * Bounce in animation - playful entrance
 */
export function createBounceInAnimation(animValue: Animated.Value, delay: number = 0) {
  return Animated.sequence([
    Animated.delay(delay),
    Animated.spring(animValue, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }),
  ]);
}

/**
 * Stagger animation - sequential entrance
 */
export function createStaggerAnimation(
  animValues: Animated.Value[],
  delay: number = 100
) {
  return Animated.sequence(
    animValues.map((animValue, index) =>
      Animated.parallel([
        Animated.delay(index * delay),
        createBounceInAnimation(animValue),
      ])
    )
  );
}

/**
 * Convert rotation value to rotation string
 */
export function getRotateInterpolation(animValue: Animated.Value) {
  return animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
}

/**
 * Convert scale value to transform
 */
export function getScaleTransform(animValue: Animated.Value) {
  return { scale: animValue };
}

/**
 * Convert opacity value
 */
export function getOpacityInterpolation(animValue: Animated.Value) {
  return animValue;
}
