import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchSearchEpisodes, IMAGE_BASE_URL, Episode } from '@/constants/apiConfig';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setEpisodes([]);
      return;
    }

    setLoading(true);
    try {
      const json = await fetchSearchEpisodes(text);
      if (json.success) {
        setEpisodes(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Episode }) => (
    <TouchableOpacity 
      activeOpacity={0.7}
      style={styles.card}
      onPress={() => router.push({ pathname: '/episode/[id]', params: { id: item.id } })}
    >
      <Image 
        source={{ uri: item.thumbnail_url?.startsWith('http') ? item.thumbnail_url : `${IMAGE_BASE_URL}${item.thumbnail_url}` }} 
        style={styles.thumbnail} 
      />
      <View style={styles.cardContent}>
        <Text style={styles.category}>{item.category_name || 'General'}</Text>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.meta}>
          <Ionicons name="mic-outline" size={10} color="#94a3b8" /> {item.podcast_title}
        </Text>
      </View>
      <View style={styles.playIconContainer}>
        <Ionicons name="play-circle-outline" size={24} color="#3b82f6" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <Text style={styles.header}>Search</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search episodes..."
            placeholderTextColor="#94a3b8"
            value={query}
            onChangeText={handleSearch}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : query.length > 0 && episodes.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="search-outline" size={64} color="#1e293b" />
          <Text style={styles.emptyText}>No episodes found for "{query}"</Text>
        </View>
      ) : query.length === 0 ? (
        <View style={styles.centered}>
          <View style={styles.hintContainer}>
             <Ionicons name="mic-outline" size={64} color="#1e293b" />
             <Text style={styles.emptyText}>Search for messages, sermons, or hosts</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={episodes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1c',
  },
  searchHeader: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  hintContainer: {
    alignItems: 'center',
    opacity: 0.5,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    height: 100,
  },
  thumbnail: {
    width: 100,
    height: '100%',
    backgroundColor: '#1e293b',
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  playIconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    color: '#3b82f6',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
