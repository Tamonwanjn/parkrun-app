import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BlurTabBarBackground() {
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="systemChromeMaterial"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
  const { bottom } = useSafeAreaInsets();
  
  // Try to get the tab bar height, but handle the case when it's not available
  let tabHeight = 0;
  try {
    tabHeight = useBottomTabBarHeight();
  } catch (error) {
    // If we can't get the tab bar height, use a default value or just the bottom inset
    console.warn('Could not get bottom tab bar height, using fallback value');
    tabHeight = bottom + 49; // Default iOS tab bar height is approximately 49
  }
  
  return tabHeight - bottom;
}
