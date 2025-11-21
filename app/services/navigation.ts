import { router } from 'expo-router';

export function navigateToHome() {
  try {
    router.replace('/');
  } catch (e) {
    // fallback
    router.push('/');
  }
}

export function navigateToDetails(itemId: string) {
  router.push(`/details/${itemId}`);
}

export function navigateToFavourites() {
  router.push('/favourites');
}

export function navigateToProfile() {
  router.push('/profile');
}
