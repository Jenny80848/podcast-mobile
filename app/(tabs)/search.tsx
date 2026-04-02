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
      style={styles.card}
      onPress={() => router.push({ pathname: '/episode/[id]', params: { id: item.id } })}
    >
      <Image 
        source={{ uri: item.thumbnail_url?.startsWith('http') ? item.thumbnail_url : `${IMAGE_BASE_URL}${item.thumbnail_url}` }} 
        style={styles.thumbnail} 
      />
      <div style={styles.cardContent}>
        <Text style={styles.category}>{item.category_name || 'General'}</Text>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.meta}>{item.podcast_title}</Text>
      </div>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search episodes..."
          placeholderTextColor="#94a3b8"
          value={query}
          onChangeText={handleSearch}
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={20} color="#94a3b8" />
          </TouchableOpacity>
        )}
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
          <Ionicons name="mic-outline" size={64} color="#1e293b" />
          <Text style={styles.emptyText}>Search for your favorite podcasts</Text>
        </View>
      ) : (
        <FlatList
          data={episodes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1c',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    height: 90,
  },
  thumbnail: {
    width: 90,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  category: {
    color: '#3b82f6',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  meta: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
