import { Link, router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

export default function Navbar() {
  return (
    <ThemedView style={styles.container}>
      <Link href={'/' as any} asChild>
        <TouchableOpacity style={styles.link}>
          <ThemedText type="defaultSemiBold">Home</ThemedText>
        </TouchableOpacity>
      </Link>

      <Link href={'/about' as any} asChild>
        <TouchableOpacity style={styles.link}>
          <ThemedText type="defaultSemiBold">About</ThemedText>
        </TouchableOpacity>
      </Link>

      <Link href={'/contact' as any} asChild>
        <TouchableOpacity style={styles.link}>
          <ThemedText type="defaultSemiBold">Contact</ThemedText>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.link} onPress={() => router.push('/favourites' as any)}>
        <ThemedText type="defaultSemiBold">Favourites</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menu} onPress={() => router.push('/profile' as any)}>
        <ThemedText>Menu</ThemedText>
      </TouchableOpacity>
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
    elevation: 3,
    zIndex: 50,
    backgroundColor: 'transparent',
  },
  link: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  menu: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(10,126,164,0.06)',
    borderRadius: 6,
  },
});
