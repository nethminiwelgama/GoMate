import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

export default function Profile() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText>Manage your account settings here.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { padding: 20, flex: 1 } });
