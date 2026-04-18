import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useAudioPlayer } from 'expo-audio';
import { fetchEpisode, IMAGE_BASE_URL, Episode } from '@/constants/apiConfig';
import { Ionicons } from '@expo/vector-icons';

export default function EpisodeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize Video Player
  const videoPlayer = useVideoPlayer('', (player) => {
    player.loop = false;
  });

  // Initialize Audio Player
  const audioPlayer = useAudioPlayer('');

  useEffect(() => {
    if (id) loadEpisode();
  }, [id]);

  useEffect(() => {
    if (episode) {
      if (episode.video_url) {
        videoPlayer.replace(getMediaUrl(episode.video_url));
      }
      if (episode.audio_url) {
        audioPlayer.replace(getMediaUrl(episode.audio_url));
      }
    }
  }, [episode]);

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

  const getMediaUrl = (url: string | undefined) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${IMAGE_BASE_URL}${url}`;
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
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: '',
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
        )
      }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mediaContainer}>
          {episode.video_url ? (
            <VideoView
              player={videoPlayer}
              allowsFullscreen
              allowsPictureInPicture
              style={styles.video}
            />
          ) : (
            <View style={styles.imageWrapper}>
              <Image 
                source={{ uri: getMediaUrl(episode.thumbnail_url) }} 
                style={styles.thumbnailBackground} 
                blurRadius={10}
              />
              <Image 
                source={{ uri: getMediaUrl(episode.thumbnail_url) }} 
                style={styles.thumbnailMain} 
              />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{episode.category_name}</Text>
          <Text style={styles.title}>{episode.title}</Text>
          <Text style={styles.podcastTitle}>{episode.podcast_title}</Text>
          
          <View style={styles.controlsContainer}>
            {episode.audio_url && (
              <View style={styles.playerBox}>
                <Text style={styles.playerLabel}>Audio Episode</Text>
                <TouchableOpacity 
                   style={styles.playButton} 
                   onPress={() => audioPlayer.playing ? audioPlayer.pause() : audioPlayer.play()}
                >
                  <Ionicons 
                    name={audioPlayer.playing ? "pause-circle" : "play-circle"} 
                    size={64} 
                    color="#3b82f6" 
                  />
                </TouchableOpacity>
                <View style={styles.progressBarContainer}>
                   <View style={[styles.progressBar, { width: `${(audioPlayer.currentTime / audioPlayer.duration) * 100}%` }]} />
                </View>
              </View>
            )}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>About this episode</Text>
            <Text style={styles.description}>{episode.description}</Text>
          </View>

          <View style={styles.statsRow}>
             <View style={styles.stat}>
               <Ionicons name="eye-outline" size={20} color="#94a3b8" />
               <Text style={styles.statText}>{episode.view_count} Views</Text>
             </View>
             <View style={styles.stat}>
               <Ionicons name="time-outline" size={20} color="#94a3b8" />
               <Text style={styles.statText}>{episode.duration} min</Text>
             </View>
          </View>
        </View>
      </ScrollView>
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
  backButton: {
    marginLeft: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaContainer: {
    width: '100%',
    height: 450,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  thumbnailMain: {
    width: '80%',
    height: '70%',
    borderRadius: 20,
  },
  content: {
    padding: 24,
    marginTop: -40,
    backgroundColor: '#0a0f1c',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  category: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
    marginBottom: 8,
  },
  podcastTitle: {
    color: '#94a3b8',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 32,
  },
  controlsContainer: {
    marginBottom: 32,
  },
  playerBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
  },
  playerLabel: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playButton: {
    marginBottom: 24,
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  infoSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 26,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
});
