import AsyncStorage from '@react-native-async-storage/async-storage';

const FAV_KEY = 'GM_FAVS_V1';

export async function getFavourites(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FAV_KEY);
  return raw ? JSON.parse(raw) : [];
}

async function persistFavourites(ids: string[]) {
  await AsyncStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

export async function clearFavourites() {
  await AsyncStorage.removeItem(FAV_KEY);
}

export async function markAsFavourite(itemId: string) {
  const favs = await getFavourites();
  if (!favs.includes(itemId)) {
    favs.push(itemId);
    await persistFavourites(favs);
  }
}

export async function removeFromFavourite(itemId: string) {
  const favs = await getFavourites();
  const next = favs.filter((id) => id !== itemId);
  await persistFavourites(next);
}

export async function checkIfFavourite(itemId: string) {
  const favs = await getFavourites();
  return favs.includes(itemId);
}

export { persistFavourites };

