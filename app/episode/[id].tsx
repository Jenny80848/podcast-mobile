import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { fetchEpisode, IMAGE_BASE_URL, Episode } from '@/constants/apiConfig';
import { Ionicons } from '@expo/vector-icons';

export default function EpisodeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) loadEpisode();
  }, [id]);

  const loadEpisode = async () => {
    try {
      const json = await fetchEpisode(Number(id));
      if (json.success) {
        setEpisode(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!episode) return null;

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Playing' }} />
      <View style={styles.mediaContainer}>
        {episode.video_url ? (
          <Video
            source={{ uri: episode.video_url }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={false}
            useNativeControls
            style={styles.video}
          />
        ) : episode.audio_url ? (
          <View style={styles.audioPlaceholder}>
            <Image 
              source={{ uri: episode.thumbnail_url?.startsWith('http') ? episode.thumbnail_url : `${IMAGE_BASE_URL}${episode.thumbnail_url}` }} 
              style={styles.audioThumbnail} 
            />
            <View style={styles.audioControls}>
               <Text style={styles.audioText}>Audio Episode</Text>
               <Video
                  source={{ uri: episode.audio_url }}
                  useNativeControls
                  style={{ height: 45, width: '100%' }}
               />
            </View>
          </View>
        ) : (
          <Image 
            source={{ uri: episode.thumbnail_url?.startsWith('http') ? episode.thumbnail_url : `${IMAGE_BASE_URL}${episode.thumbnail_url}` }} 
            style={styles.video} 
          />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.category}>{episode.category_name}</Text>
        <Text style={styles.title}>{episode.title}</Text>
        <Text style={styles.podcastTitle}>{episode.podcast_title}</Text>
        <Text style={styles.description}>{episode.description}</Text>
      </View>
    </ScrollView>
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
  mediaContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  audioPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioThumbnail: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  audioControls: {
    width: '90%',
    alignItems: 'center',
  },
  audioText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    padding: 20,
  },
  category: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  podcastTitle: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 20,
  },
  description: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
  },
});
