import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

export default function Favourites() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Favourites</ThemedText>
      <ThemedText>Your saved favourites will appear here.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { padding: 20, flex: 1 } });
