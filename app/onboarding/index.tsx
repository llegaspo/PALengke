import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';

const { height } = Dimensions.get('window');

const t = {
  English: {
    title: 'Start by choosing your path:',
    option1: 'I already have a business',
    option2: 'I want to start a business',
    confirm: 'Confirm',
  },
  Tagalog: {
    title: 'Simulan sa pagpili ng iyong landas:',
    option1: 'May negosyo na ako',
    option2: 'Nais kong magsimula ng negosyo',
    confirm: 'Magpatuloy',
  },
  Bisaya: {
    title: 'Sugdi pinaagi sa pagpili sa imong dalan:',
    option1: 'Naa koy negosyo',
    option2: 'Gusto kong magsugod og negosyo',
    confirm: 'Padayon',
  },
};

export default function OnboardingScreen() {
  const router = useRouter();
  const [lang, setLang] = useState<'English' | 'Tagalog' | 'Bisaya'>('English');
  const [selected, setSelected] = useState<'option1' | 'option2' | null>(null);

  useEffect(() => {
    const getLang = async () => {
      const storedLang = await AsyncStorage.getItem('preferredLanguage');
      if (storedLang === 'Tagalog' || storedLang === 'Bisaya') {
        setLang(storedLang);
      }
    };
    getLang();
  }, []);

  const text = t[lang];

  const handleConfirm = () => {
    if (selected === 'option1') {
      router.push('/existing');
    } else if (selected === 'option2') {
      router.push('/start');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/png/woven-bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <BlurView intensity={10} style={styles.blurBox}>
        {selected && (
          <View style={styles.imageWrapper}>
            <Image
              source={
                selected === 'option1'
                  ? require('../../assets/png/onbrd-op1.png')
                  : require('../../assets/png/onbrd-op2.png')
              }
              style={styles.optionImage}
              resizeMode="contain"
            />
          </View>
        )}
        <Text style={styles.title}>{text.title}</Text>
        <View style={[styles.squareWrapper, selected && styles.moveDown]}>
          <TouchableOpacity
            style={[styles.square, selected === 'option1' && styles.selected]}
            onPress={() => setSelected('option1')}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, selected === 'option1' && styles.selectedText]}>
              {text.option1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.square, selected === 'option2' && styles.selected]}
            onPress={() => setSelected('option2')}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, selected === 'option2' && styles.selectedText]}>
              {text.option2}
            </Text>
          </TouchableOpacity>
          {selected && (
            <TouchableOpacity style={styles.confirmSquare} onPress={handleConfirm} activeOpacity={0.7}>
              <Text style={styles.confirmText}>{text.confirm}</Text>
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
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: '100',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  squareWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  moveDown: {
    marginTop: 16,
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
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  optionImage: {
    width: 120,
    height: 200,
  },
  confirmSquare: {
    marginTop: 24,
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
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});