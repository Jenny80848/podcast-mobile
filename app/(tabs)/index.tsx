import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchEpisodes, IMAGE_BASE_URL, Episode } from '@/constants/apiConfig';

export default function HomeScreen() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadEpisodes();
  }, []);

  const loadEpisodes = async () => {
    try {
      const json = await fetchEpisodes();
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
      <View style={styles.cardContent}>
        <Text style={styles.category}>{item.category_name || 'General'}</Text>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.meta}>{item.podcast_title} • {new Date(item.published_at).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Latest Messages</Text>
      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1c',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0f1c',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  thumbnail: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 12,
  },
  category: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  meta: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
