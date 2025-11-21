import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../themed/themed-text';
import { ThemedView } from '../themed/themed-view';

export default function Navbar() {
  return (
    <ThemedView style={styles.container}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.link}>
          <ThemedText type="defaultSemiBold">Home</ThemedText>
        </TouchableOpacity>
      </Link>

      <Link href="/about" asChild>
        <TouchableOpacity style={styles.link}>
          <ThemedText type="defaultSemiBold">About</ThemedText>
        </TouchableOpacity>
      </Link>

      <Link href="/contact" asChild>
        <TouchableOpacity style={styles.link}>
          <ThemedText type="defaultSemiBold">Contact</ThemedText>
        </TouchableOpacity>
      </Link>

      <Link href="/favourites" asChild>
        <TouchableOpacity style={styles.link}>
          <ThemedText type="defaultSemiBold">Favourites</ThemedText>
        </TouchableOpacity>
      </Link>

      <Link href="/profile" asChild>
        <TouchableOpacity style={styles.menu}>
          <ThemedText type="defaultSemiBold">Profile</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  link: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  menu: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(10,126,164,0.1)',
    borderRadius: 6,
  },
});