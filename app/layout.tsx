import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';
import 'react-native-reanimated';

import { Provider } from 'react-redux';
import { useColorScheme } from '../hooks/use-color-scheme';
import { store } from './redux/store';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background }}>
          <View style={{ flex: 1 }}>
            <Slot />
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </Provider>
    </ThemeProvider>
  );
}
