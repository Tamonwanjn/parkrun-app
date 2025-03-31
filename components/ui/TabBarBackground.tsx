// This is a shim for web and Android where the tab bar is generally opaque.
export default undefined;

export function useBottomTabOverflow() {
  // For Android and web, we'll implement similar error handling as iOS
  try {
    // If we're not in a tab navigator context, this will safely return 0
    return 0;
  } catch (error) {
    console.warn('Could not get bottom tab bar height, using fallback value');
    return 0; // Default fallback for Android/web
  }
}
