import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { IconSymbol } from '../../components/ui/icon-symbol';
import Navbar from '../../components/ui/navbar';
// simple fallback for LinearGradient to avoid requiring 'react-native-linear-gradient'
type LinearGradientProps = { colors: string[]; style?: any; children?: React.ReactNode };
const LinearGradient: React.FC<LinearGradientProps> = ({ colors, style, children }) => {
  // This fallback does not produce a true gradient; it uses the last color as a background overlay.
  const overlayStyle = Array.isArray(colors) && colors.length > 0 ? { backgroundColor: colors[colors.length - 1] } : undefined;
  return <View style={[style, overlayStyle]}>{children}</View>;
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  type Destination = { id: string; name: string; image: number };
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    setRefreshing(true);
    setTimeout(() => {
      setDestinations([
        { id: '1', name: 'New York', image: require('../../assets/images/react-logo.png') },
        { id: '2', name: 'London', image: require('../../assets/images/react-logo.png') },
        { id: '3', name: 'Tokyo', image: require('../../assets/images/react-logo.png') },
        { id: '4', name: 'Paris', image: require('../../assets/images/react-logo.png') },
      ]);
      setRefreshing(false);
    }, 1000);
  };

  const toggleFavourite = (id: string) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const renderDestination = ({ item }: { item: Destination }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => console.log('View', item.name)}>
      <Image source={item.image} style={styles.cardImage} />
      <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']} style={styles.cardOverlay}>
        <ThemedText type="defaultSemiBold" style={styles.cardText}>{item.name}</ThemedText>
        <TouchableOpacity onPress={() => toggleFavourite(item.id)}>
          <IconSymbol
            name={favourites.includes(item.id) ? ('heart.fill' as any) : ('heart' as any)}
            size={24}
            color={favourites.includes(item.id) ? 'red' : 'white'}
          />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>
      <Navbar />
      <ThemedText type="title" style={styles.title}>GoMate</ThemedText>

      <TextInput
        style={[styles.search, { backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#f0f0f0' }]}
        placeholder="Search flights, trains, cars..."
        placeholderTextColor={colorScheme === 'dark' ? '#888' : '#555'}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickRow}>
        {[
          { label: 'Flights', icon: 'paperplane.fill' },
          { label: 'Stays', icon: 'house.fill' },
          { label: 'Cars', icon: 'car.fill' },
        ].map((action, index) => (
          <TouchableOpacity key={index} style={styles.quickAction} activeOpacity={0.8}>
            <IconSymbol name={action.icon as any} size={28} color="#0a7ea4" />
            <ThemedText type="defaultSemiBold">{action.label}</ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ThemedText type="title" style={styles.sectionTitle}>Popular Destinations</ThemedText>
      <FlatList
        data={destinations}
        horizontal
        keyExtractor={(d) => d.id}
        renderItem={renderDestination}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      <ThemedText type="title" style={styles.sectionTitle}>Recent Trips</ThemedText>
      <FlatList
        data={[
          { id: 'r1', name: 'Trip to San Francisco' },
          { id: 'r2', name: 'Weekend in Chicago' },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ThemedText style={styles.recentItem}>- {item.name}</ThemedText>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchDestinations} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  search: { marginTop: 8, padding: 12, borderRadius: 12 },
  quickRow: { marginTop: 16 },
  quickAction: {
    width: 110,
    height: 110,
    marginRight: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10,126,164,0.1)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  sectionTitle: { marginTop: 24, marginBottom: 12 },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    height: 180,
    width: 140,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cardImage: { width: '100%', height: '100%' },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  recentItem: { fontSize: 16, marginVertical: 4 },
});
