import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from './components/themed/themed-text';
import { ThemedView } from './components/themed/themed-view';

export default function Favourites() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Favourites</ThemedText>
      <ThemedText style={styles.text}>
        Your saved favourites will appear here.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});