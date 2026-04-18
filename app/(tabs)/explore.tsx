import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchCategories, Category } from '@/constants/apiConfig';
import { Ionicons } from '@expo/vector-icons';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const json = await fetchCategories();
      if (json.success) {
        setCategories(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadCategories();
  }, []);

  const getIconForCategory = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('prayer')) return 'flame-outline';
    if (n.includes('faith')) return 'shield-checkmark-outline';
    if (n.includes('kingdom')) return 'planet-outline';
    if (n.includes('worship')) return 'musical-notes-outline';
    return 'mic-outline';
  };

  const renderItem = ({ item, index }: { item: Category; index: number }) => {
    const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981'];
    const color = colors[index % colors.length];

    return (
      <TouchableOpacity 
        activeOpacity={0.7}
        style={[styles.card, { borderColor: `${color}33` }]}
        onPress={() => {/* Navigation to filtered list */}}
      >
        <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
          <Ionicons name={getIconForCategory(item.name)} size={28} color={color} />
        </View>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.episodeCount}>Browse Messages</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Categories</Text>
            <Text style={styles.subHeader}>Explore messages by topic</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3b82f6"
            colors={['#3b82f6']}
            backgroundColor="#0a0f1c"
          />
        }
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
    paddingBottom: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
  },
  list: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    width: '48%',
    borderWidth: 1,
    alignItems: 'flex-start',
    height: 160,
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },
  episodeCount: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
});
