import React from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '../../components/parallax-scroll-view';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { Collapsible } from '../../components/ui/collapsible';
import { IconSymbol } from '../../components/ui/icon-symbol';

export default function AppNavigator() {
  const headerImage = (
    <View style={styles.headerContainer}>
      <Image source={require('../../assets/images/react-logo.png')} style={styles.logo} />
      <ThemedText type="title">GoMate</ThemedText>
      <ThemedText type="subtitle">Travel & Transport</ThemedText>
    </View>
  );

  return (
    <ParallaxScrollView
      headerImage={headerImage}
      headerBackgroundColor={{ light: '#0a7ea4', dark: '#0a7ea4' }}>
      <ThemedView style={styles.container}>
        <ThemedText type="defaultSemiBold">Where are you going?</ThemedText>

        <TextInput style={styles.search} placeholder="Search flights, trains, cars..." />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickRow}>
          <TouchableOpacity style={styles.quickAction} activeOpacity={0.8}>
            <IconSymbol name="paperplane.fill" size={28} color="#0a7ea4" />
            <ThemedText type="defaultSemiBold">Flights</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} activeOpacity={0.8}>
            <IconSymbol name="house.fill" size={28} color="#0a7ea4" />
            <ThemedText type="defaultSemiBold">Stays</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} activeOpacity={0.8}>
            <IconSymbol name="chevron.left.forwardslash.chevron.right" size={28} color="#0a7ea4" />
            <ThemedText type="defaultSemiBold">Cars</ThemedText>
          </TouchableOpacity>
        </ScrollView>

        <ThemedText type="title" style={{ marginTop: 12 }}>Popular Destinations</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.destinations}>
          <ThemedView style={styles.card}><ThemedText>New York</ThemedText></ThemedView>
          <ThemedView style={styles.card}><ThemedText>London</ThemedText></ThemedView>
          <ThemedView style={styles.card}><ThemedText>Tokyo</ThemedText></ThemedView>
        </ScrollView>

        <Collapsible title="Recent Trips">
          <ThemedText>- Trip to San Francisco</ThemedText>
          <ThemedText>- Weekend in Chicago</ThemedText>
        </Collapsible>

        <Collapsible title="Help & FAQ">
          <ThemedText>- How to change booking?</ThemedText>
          <ThemedText>- Refund policy</ThemedText>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 8,
  },
  container: {
    padding: 20,
  },
  search: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  quickRow: {
    marginTop: 12,
  },
  quickAction: {
    width: 100,
    height: 100,
    marginRight: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10,126,164,0.06)'
  },
  destinations: {
    marginTop: 12,
  },
  card: {
    width: 140,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)'
  }
});
