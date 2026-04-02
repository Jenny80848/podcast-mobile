import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80' }} 
        style={styles.heroImage} 
      />
      <View style={styles.content}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          Podcaster was founded on the belief that meaningful conversations have the power to change the world. What started as a late-night recording session in a basement has grown into a global network.
        </Text>
        <Text style={styles.description}>
          We dive deep into technology, design, and culture with the minds actively shaping the future. Our goal is to bring you actionable insights, fascinating stories, and a community of curious listeners.
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
             <Text style={styles.statNumber}>50+</Text>
             <Text style={styles.statLabel}>Shows</Text>
          </View>
          <View style={styles.statBox}>
             <Text style={styles.statNumber}>1M+</Text>
             <Text style={styles.statLabel}>Listeners</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1c' },
  heroImage: { width: '100%', height: 200 },
  content: { padding: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  description: { color: '#cbd5e1', fontSize: 16, lineHeight: 24, marginBottom: 16 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, borderTopWidth: 1, borderTopColor: '#1e293b', paddingTop: 20 },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#94a3b8', fontSize: 12, textTransform: 'uppercase' },
});
