import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ title: 'About Us' }} />
        <Stack.Screen name="contact" options={{ title: 'Contact' }} />
        <Stack.Screen name="favourites" options={{ title: 'Favourites' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      </Stack>
    </Provider>
  );
}