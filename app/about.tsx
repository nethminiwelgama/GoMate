import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

export default function About() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">About Us</ThemedText>
      <ThemedText>GoMate helps you find and book transport and stays worldwide.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { padding: 20, flex: 1 } });
