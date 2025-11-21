import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_STATE_KEY = 'GM_APP_STATE_V1';

export async function updateAppState(key: string, value: any) {
  const raw = await AsyncStorage.getItem(APP_STATE_KEY);
  const state = raw ? JSON.parse(raw) : {};
  state[key] = value;
  await AsyncStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}

export async function getAppState(key: string) {
  const raw = await AsyncStorage.getItem(APP_STATE_KEY);
  const state = raw ? JSON.parse(raw) : {};
  return state[key];
}

export async function resetAppState() {
  await AsyncStorage.removeItem(APP_STATE_KEY);
}
