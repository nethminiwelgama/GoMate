import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

export default function Contact() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Contact</ThemedText>
      <ThemedText>Reach out at support@gomate.example</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { padding: 20, flex: 1 } });
