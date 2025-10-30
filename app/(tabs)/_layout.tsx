import { Tabs, useRouter, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MagicMenu } from '@/components/magic-menu';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Menü öğeleri
  const menuItems = [
    { name: 'index', icon: 'home-outline', label: 'Anasayfa' },
    { name: 'profile', icon: 'person-outline', label: 'Profil' },
    { name: 'messages', icon: 'chatbubble-outline', label: 'Mesajlar' },
    { name: 'photos', icon: 'camera-outline', label: 'Fotolar' },
    { name: 'settings', icon: 'settings-outline', label: 'Ayarlar' },
  ];

  // Aktif tab'ı belirle
  const getActiveIndex = () => {
    const currentTab = pathname.split('/').pop() || 'index';
    return menuItems.findIndex(item => item.name === currentTab);
  };

  const [activeIndex, setActiveIndex] = useState(() => getActiveIndex());

  useEffect(() => {
    setActiveIndex(getActiveIndex());
  }, [pathname]);

  const handleMenuPress = (index: number) => {
    const item = menuItems[index];
    router.push(`/(tabs)/${item.name}` as any);
  };

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Standart tab bar'ı gizle
        }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="messages" />
        <Tabs.Screen name="photos" />
        <Tabs.Screen name="settings" />
        <Tabs.Screen name="explore" options={{ href: null }} /> {/* Eski sayfayı gizle */}
      </Tabs>

      {/* Özel menü */}
      <View style={styles.menuContainer}>
        <MagicMenu items={menuItems as any} onPress={handleMenuPress} initialIndex={activeIndex} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f363e',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});
