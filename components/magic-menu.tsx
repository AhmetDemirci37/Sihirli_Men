import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

interface MagicMenuProps {
  items: MenuItem[];
  onPress?: (index: number) => void;
  initialIndex?: number;
}

export function MagicMenu({ items, onPress, initialIndex = 0 }: MagicMenuProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [animations] = useState(
    items.map(() => new Animated.Value(0))
  );

  // İlk seferde initialIndex'i ayarla
  useEffect(() => {
    if (initialIndex !== activeIndex) {
      setActiveIndex(initialIndex);
      animations.forEach((anim, index) => {
        if (index === initialIndex) {
          anim.setValue(1);
        }
      });
    }
  }, [initialIndex]);

  const handlePress = (index: number) => {
    setActiveIndex(index);
    
    // Animasyonu sıfırla
    animations.forEach(anim => anim.setValue(0));
    
    // Active item animasyonu
    Animated.parallel([
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const translateY = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, -35],
          });
          const scale = animations[index].interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.5, 1],
          });

          return (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handlePress(index)}
              activeOpacity={0.8}
            >
              {/* Active indicator - yeşil nokta */}
              {isActive && <View style={styles.activeIndicator} />}
              
              {/* Icon container */}
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    transform: [{ translateY }],
                    backgroundColor: isActive ? '#29fd53' : 'transparent',
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.iconInner,
                    {
                      transform: [{ scale }],
                      backgroundColor: isActive ? '#2f363e' : 'transparent',
                    },
                  ]}
                />
                <Ionicons
                  name={item.icon as any}
                  size={32}
                  color={isActive ? '#fff' : '#2f363e'}
                  style={styles.icon}
                />
              </Animated.View>

              {/* Label */}
              <Animated.Text
                style={[
                  styles.label,
                  {
                    opacity: animations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                    transform: [
                      {
                        translateY: animations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [15, 5],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {item.label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  navigation: {
    flexDirection: 'row',
    width: '90%',
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    // Shadow effects
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  activeIndicator: {
    position: 'absolute',
    top: 25,
    width: 6,
    height: 6,
    backgroundColor: '#0f0',
    borderRadius: 3,
    // Glow effect
    shadowColor: '#0f0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // Shadow for icon
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconInner: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    zIndex: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginTop: 5,
    // Shadow for label
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

