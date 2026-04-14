import { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  const [loaded, error] = useFonts({
    ...Ionicons.font,
  });

  useEffect(() => {
    if (loaded || error) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [loaded, error]);

  if (!appIsReady) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0a0f1c',
          },
          headerTintColor: '#fff',
          drawerStyle: {
            backgroundColor: '#0a0f1c',
            width: 280,
          },
          drawerActiveTintColor: '#3b82f6',
          drawerInactiveTintColor: '#94a3b8',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            title: 'Pastor Tems Ifidi Ministries',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: 'About',
            title: 'About Us',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="contact"
          options={{
            drawerLabel: 'Contact',
            title: 'Get in Touch',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="mail-outline" size={size} color={color} />
            ),
          }}
        />
        {/* Hidden Stack screens */}
        <Drawer.Screen
          name="episode/[id]"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Playing',
          }}
        />
        <Drawer.Screen
          name="modal"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Modal',
          }}
        />
      </Drawer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <Image 
        source={require('@/assets/images/tems.jpeg')} 
        style={[styles.loadingIcon, { borderRadius: 100 }]} 
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#3b82f6" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0f1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    width: 200,
    height: 200,
  },
  loader: {
    marginTop: 20,
  },
});
