import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

const translations = {
  English: {
    title: 'Set Preferred Language:',
    confirm: 'Confirm',
  },
  Tagalog: {
    title: 'Itakda ang Gustong Wika:',
    confirm: 'Magpatuloy',
  },
  Bisaya: {
    title: 'Pislita ang Ganahan na Pinulongan:',
    confirm: 'Padayun',
  },
};

function GradientText({ text, style }: { text: string, style?: any }) {
  return (
    <MaskedView maskElement={<Text style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>}>
      <LinearGradient
        colors={["#69006C", "#F396FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<'English' | 'Tagalog' | 'Bisaya' | null>(null);

  const handleConfirm = async () => {
    if (selectedLang) {
      await AsyncStorage.setItem('preferredLanguage', selectedLang);
      router.push('/onboarding');
    }
  };

  const currentText = translations[selectedLang || 'English'];

  return (
    <ImageBackground
      source={require('../../assets/png/woven-bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <BlurView intensity={10} style={styles.blurBox}>
        <Text style={styles.title}>{currentText.title}</Text>
        <View style={styles.squareWrapper}>
          {(['English', 'Tagalog', 'Bisaya'] as const).map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[styles.square, selectedLang === lang && styles.selected]}
              onPress={() => setSelectedLang(lang)}
              activeOpacity={0.7}
            >
              {selectedLang === lang ? (
                <GradientText text={lang} style={[styles.text, styles.selectedText]} />
              ) : (
                <Text style={styles.text}>{lang}</Text>
              )}
            </TouchableOpacity>
          ))}
          {selectedLang && (
            <TouchableOpacity style={styles.confirmSquare} onPress={handleConfirm} activeOpacity={0.7}>
              <Text style={styles.confirmText}>{currentText.confirm}</Text>
            </TouchableOpacity>
          )}
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 390,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurBox: {
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    height: '90%',
    width: '85%',
    boxShadow: '3px 4px 4px 0px rgba(173,0 ,29, 0.25)',
    maxWidth: 390,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    fontWeight: '100',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    paddingBottom: 48,
    textAlign: 'center',
  },
  squareWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: -100,
  },
  square: {
    width: '72%',
    height: 50,
    borderRadius: 278,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  selected: {
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedText: {
    color: '#69006c',
  },
  confirmSquare: {
    width: '72%',
    height: 50,
    borderRadius: 278,
    backgroundColor: '#ba6ada',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});