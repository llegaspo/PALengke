import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFontFamily } from './FontConfig';

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
  fontsLoaded?: boolean;
  onNavigateToResources?: () => void;
  onNavigateToAnalytics?: () => void;
}

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.75; // 3/4 of screen width

const SideMenu: React.FC<SideMenuProps> = ({ 
  isVisible, 
  onClose, 
  fontsLoaded = true,
  onNavigateToResources,
  onNavigateToAnalytics
}) => {
  const slideAnimation = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;
  const menuItemAnimations = useRef(new Array(2).fill(null).map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnimation, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      // Stagger menu item animations
      menuItemAnimations.forEach((animation, index) => {
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          delay: 100 + (index * 50),
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: -MENU_WIDTH,
          duration: 350,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnimation, {
          toValue: 0,
          duration: 350,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      // Reset menu item animations
      menuItemAnimations.forEach((animation) => {
        animation.setValue(0);
      });
    }
  }, [isVisible]);

  const menuItems = [
    {
      id: 'analytics',
      title: 'Analytics',
      icon: 'analytics-outline',
      onPress: () => {
        onNavigateToAnalytics?.();
        onClose();
      }
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: 'library-outline',
      onPress: () => {
        onNavigateToResources?.();
        onClose();
      }
    },
  ];

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {/* Overlay */}
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: overlayAnimation,
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.overlayTouchable}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Side Menu */}
      <Animated.View 
        style={[
          styles.sideMenu,
          {
            transform: [{ translateX: slideAnimation }],
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { fontFamily: getFontFamily('bold', fontsLoaded) }]}>
            PALengke
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#4D0045" />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContent}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.id}
              style={{
                opacity: menuItemAnimations[index],
                transform: [
                  {
                    translateX: menuItemAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              }}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <Ionicons name={item.icon as any} size={22} color="#4D0045" />
                <Text style={[styles.menuItemText, { fontFamily: getFontFamily('medium', fontsLoaded) }]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}


        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { fontFamily: getFontFamily('regular', fontsLoaded) }]}>
            Version 1.0.0
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 24,
    color: '#4D0045',
  },
  closeButton: {
    padding: 4,
  },
  menuContent: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
  },
}); 