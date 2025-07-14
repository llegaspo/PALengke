import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFontFamily } from './FontConfig';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  hasImage?: boolean;
}

interface BottomNavbarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  fontsLoaded?: boolean;
  products?: Product[];
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ activeTab, onTabPress, fontsLoaded = true, products = [] }) => {
  // Check if there are any out-of-stock items
  const hasOutOfStockItems = products.some(product => product.stock <= 0);

  const tabs = [
    { name: 'home', icon: 'home-outline' as const, activeIcon: 'home' as const, label: 'Home' },
    { name: 'shop', icon: 'storefront-outline' as const, activeIcon: 'storefront' as const, label: 'Sales' },
    { name: 'chat', icon: 'chatbubbles-outline' as const, activeIcon: 'chatbubbles' as const, label: 'Chat' },
    { name: 'wallet', icon: 'wallet-outline' as const, activeIcon: 'wallet' as const, label: 'Wallet' },
  ];

  const animatedValues = React.useRef(
    tabs.reduce((acc, tab) => {
      acc[tab.name] = {
        scale: new Animated.Value(tab.name === activeTab ? 1.3 : 1),
        labelOpacity: new Animated.Value(tab.name === activeTab ? 1 : 0),
        iconTranslateY: new Animated.Value(tab.name === activeTab ? -2 : 0),
      };
      return acc;
    }, {} as Record<string, { scale: Animated.Value; labelOpacity: Animated.Value; iconTranslateY: Animated.Value }>)
  ).current;

  React.useEffect(() => {
    tabs.forEach((tab) => {
      const isActive = activeTab === tab.name;
      const animations = animatedValues[tab.name];

      // Smooth scale animation for icons
      Animated.spring(animations.scale, {
        toValue: isActive ? 1.3 : 1,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
        overshootClamping: false,
      }).start();

      // Smooth label opacity animation
      Animated.timing(animations.labelOpacity, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Subtle icon lift animation
      Animated.spring(animations.iconTranslateY, {
        toValue: isActive ? -2 : 0,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }).start();
    });
  }, [activeTab]);

  const handleTabPress = (tabName: string) => {
    // Smooth press animation
    const animations = animatedValues[tabName];
    
    Animated.sequence([
      Animated.spring(animations.scale, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 200,
        friction: 6,
      }),
      Animated.spring(animations.scale, {
        toValue: activeTab === tabName ? 1.3 : 1,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }),
    ]).start();

    onTabPress(tabName);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        const animations = animatedValues[tab.name];
        const showAlert = tab.name === 'shop' && hasOutOfStockItems;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.name)}
            activeOpacity={0.8}
          >
            <View style={styles.tabContent}>
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    transform: [
                      { scale: animations.scale },
                      { translateY: animations.iconTranslateY },
                    ],
                  },
                ]}
              >
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={isActive ? 28 : 24}
                  color={isActive ? '#4D0045' : '#8E8E93'}
                />
                {showAlert && (
                  <View style={styles.alertBadge}>
                    <View style={styles.alertDot} />
                  </View>
                )}
              </Animated.View>
              
              <Animated.View
                style={[
                  styles.labelContainer,
                  {
                    opacity: animations.labelOpacity,
                  },
                ]}
              >
                <Text style={[
                  styles.tabLabel, 
                  { 
                    color: '#4D0045',
                    fontFamily: getFontFamily('medium', fontsLoaded)
                  }
                ]}>
                  {tab.label}
                </Text>
              </Animated.View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 55,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  alertBadge: {
    position: 'absolute',
    top: -2,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  alertDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
});

export default BottomNavbar; 