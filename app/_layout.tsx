import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
            title: 'Podcaster',
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
