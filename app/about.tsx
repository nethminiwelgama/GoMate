import React from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from './components/themed/themed-text';
import { ThemedView } from './components/themed/themed-view';

export default function About() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">About Us</ThemedText>
      <ThemedText style={styles.text}>
        GoMate helps you find and book transport and stays worldwide.
      </ThemedText>
      <Link href="/" style={styles.backLink}>
        <ThemedText type="link">← Back to Home</ThemedText>
      </Link>
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
    marginBottom: 20,
  },
  backLink: {
    marginTop: 20,
    padding: 10,
  },
});