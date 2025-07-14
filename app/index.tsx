import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { loadFonts, getFontFamily } from '../components/FontConfig';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load fonts first
        const fontSuccess = await loadFonts();
        setFontsLoaded(fontSuccess);

        // Check if user has already completed onboarding
        const hasCompletedOnboarding = await AsyncStorage.getItem('onboardingCompleted');
        
        // Add a small delay to prevent flash
        setTimeout(() => {
          if (hasCompletedOnboarding === 'true') {
            // User has completed onboarding, go to main app
            router.replace('/(app)/main');
          } else {
            // User needs to go through onboarding
            router.replace('/(first)/language');
          }
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error initializing app:', error);
        // Default to onboarding if there's an error
        router.replace('/(first)/language');
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.loadingText, { fontFamily: getFontFamily('medium', fontsLoaded) }]}>
          Loading PALengke...
        </Text>
      </View>
    );
  }

  // This should never be reached as router.replace redirects immediately
  return (
    <View style={styles.container}>
      <Text style={[styles.loadingText, { fontFamily: getFontFamily('medium', fontsLoaded) }]}>
        Initializing...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4D0045',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
}); 