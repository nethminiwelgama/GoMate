import { Alert, Image, Platform, ToastAndroid } from 'react-native';

export async function toggleDarkMode(): Promise<'light' | 'dark'> {
  // This is a frontend-only toggle helper. It attempts to read/write via global `localStorage` on web
  // or returns the opposite value passed by caller in native apps. For a full app this should be
  // integrated with app state (AsyncStorage / Redux).
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const current = window.localStorage.getItem('GM_THEME') ?? 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem('GM_THEME', next);
      return next as 'light' | 'dark';
    }
  } catch (e) {
    // ignore
  }
  // native fallback: return 'dark' (caller should persist)
  return 'dark';
}

export function showToast(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
    return;
  }
  Alert.alert('', message);
}

export async function handleImageLoad(url?: string) {
  if (!url) return { uri: undefined, loaded: false };
  try {
    await Image.prefetch(url);
    return { uri: url, loaded: true };
  } catch (e) {
    return { uri: url, loaded: false };
  }
}
