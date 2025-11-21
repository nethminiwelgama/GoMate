import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  Image, 
  RefreshControl, 
  ScrollView, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  useColorScheme, 
  View 
} from 'react-native';
import { ThemedText } from './components/themed/themed-text';
import { ThemedView } from './components/themed/themed-view';
import { IconSymbol } from './components/ui/icon-symbol';
import Navbar from './components/ui/navbar';

type LinearGradientProps = { 
  colors: string[]; 
  style?: any; 
  children?: React.ReactNode 
};

const LinearGradient: React.FC<LinearGradientProps> = ({ colors, style, children }) => {
  const overlayStyle = Array.isArray(colors) && colors.length > 0 ? 
    { backgroundColor: colors[colors.length - 1] } : undefined;
  return <View style={[style, overlayStyle]}>{children}</View>;
};

type Destination = { 
  id: string; 
  name: string; 
  image: any 
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
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
        { id: '1', name: 'New York', image: require('./assets/images/react-logo.png') },
        { id: '2', name: 'London', image: require('./assets/images/react-logo.png') },
        { id: '3', name: 'Tokyo', image: require('./assets/images/react-logo.png') },
        { id: '4', name: 'Paris', image: require('./assets/images/react-logo.png') },
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
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <Image source={item.image} style={styles.cardImage} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.cardOverlay}>
        <ThemedText type="defaultSemiBold" style={styles.cardText}>{item.name}</ThemedText>
        <TouchableOpacity onPress={() => toggleFavourite(item.id)}>
          <IconSymbol
            name={favourites.includes(item.id) ? 'heart.fill' : 'heart'}
            size={24}
            color={favourites.includes(item.id) ? '#ff3b30' : '#ffffff'}
          />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <Navbar />
      
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchDestinations} />
        }
      >
        <ThemedText type="title" style={styles.title}>GoMate</ThemedText>
        <ThemedText style={styles.subtitle}>Find your perfect travel experience</ThemedText>

        <TextInput
          style={[
            styles.search, 
            { 
              backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#f0f0f0',
              color: colorScheme === 'dark' ? '#ffffff' : '#000000'
            }
          ]}
          placeholder="Search flights, trains, cars..."
          placeholderTextColor={colorScheme === 'dark' ? '#888' : '#555'}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickRow}>
          {[
            { label: 'Flights', icon: 'paperplane.fill' },
            { label: 'Stays', icon: 'house.fill' },
            { label: 'Cars', icon: 'car.fill' },
            { label: 'Trains', icon: 'chevron.right' },
          ].map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickAction} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <IconSymbol name={action.icon} size={28} color="#0a7ea4" />
              </View>
              <ThemedText type="defaultSemiBold" style={styles.quickActionText}>
                {action.label}
              </ThemedText>
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
          contentContainerStyle={styles.destinationsList}
        />

        <ThemedText type="title" style={styles.sectionTitle}>Recent Trips</ThemedText>
        <View style={styles.recentSection}>
          {[
            { id: 'r1', name: 'Trip to San Francisco', date: 'Jan 15, 2024' },
            { id: 'r2', name: 'Weekend in Chicago', date: 'Dec 22, 2023' },
          ].map((item) => (
            <View key={item.id} style={styles.recentItem}>
              <View style={styles.recentItemContent}>
                <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                <ThemedText style={styles.recentDate}>{item.date}</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={16} color="#687076" />
            </View>
          ))}
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scrollView: {
    flex: 1,
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    opacity: 0.7,
  },
  search: { 
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16, 
    borderRadius: 12,
    fontSize: 16,
  },
  quickRow: { 
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  quickAction: {
    width: 100,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(10,126,164,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: { 
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  destinationsList: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    height: 180,
    width: 140,
    backgroundColor: '#f0f0f0',
  },
  cardImage: { 
    width: '100%', 
    height: '100%' 
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600',
    flex: 1,
  },
  recentSection: {
    paddingHorizontal: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  recentItemContent: {
    flex: 1,
  },
  recentDate: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 2,
  },
  spacer: {
    height: 40,
  },
});