import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image 
        source={require('@/assets/images/tems.jpeg')} 
        style={styles.heroImage} 
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          Pastor Tems Ifidi Ministries was founded on the belief that the Word of God has the power to transform lives and bring hope to the world. What started as a small gathering has grown into a spiritual sanctuary for many.
        </Text>
        <Text style={styles.description}>
          We dive deep into the scriptures and spiritual teachings that actively shape our faith. Our goal is to bring you divine insights, powerful testimonies, and a community of believers.
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
             <Text style={styles.statNumber}>50+</Text>
             <Text style={styles.statLabel}>Messages</Text>
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
