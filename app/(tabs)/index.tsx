import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
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
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => router.push({ pathname: '/episode/[id]', params: { id: item.id } })}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.thumbnail_url?.startsWith('http') ? item.thumbnail_url : `${IMAGE_BASE_URL}${item.thumbnail_url}` }} 
          style={styles.thumbnail} 
        />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration} min</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.categoryRow}>
          <Text style={styles.category}>{item.category_name || 'General'}</Text>
          <Ionicons name="play-circle" size={24} color="#3b82f6" />
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.meta}>
          <Ionicons name="calendar-outline" size={12} color="#94a3b8" /> {new Date(item.published_at).toLocaleDateString()}  •  
          <Ionicons name="mic-outline" size={12} color="#94a3b8" /> {item.podcast_title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{color: '#94a3b8', marginTop: 10}}>Loading Messages...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.greeting}>Welcome Back</Text>
            <Text style={styles.header}>Latest Messages</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1c',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0f1c',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  greeting: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 4,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  imageContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#1e293b',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  durationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 12,
  },
  meta: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
  },
});
