import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { db } from "../firebase/firebaseConfig";
import BottomNavbar from "../components/BottomNavbar";
import { loadFonts, getFontFamily } from "../components/FontConfig";
import Home from "./home";
import Shop from "./shop";
import Chat from "./chat";
import Wallet from "./wallet";

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontLoadingComplete, setFontLoadingComplete] = useState(false);

  useEffect(() => {
    const loadAppFonts = async () => {
      try {
        const success = await loadFonts();
        setFontsLoaded(success);
        setFontLoadingComplete(true);
        console.log('Font loading result:', success);
      } catch (error) {
        console.log('Error loading fonts:', error);
        setFontsLoaded(false);
        setFontLoadingComplete(true);
      }
    };

    loadAppFonts();
  }, []);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    const props = { fontsLoaded };
    
    switch (activeTab) {
      case 'home':
        return <Home {...props} />;
      case 'shop':
        return <Shop {...props} />;
      case 'chat':
        return <Chat {...props} />;
      case 'wallet':
        return <Wallet {...props} />;
      default:
        return <Home {...props} />;
    }
  };

  if (!fontLoadingComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        {renderContent()}
        <BottomNavbar activeTab={activeTab} onTabPress={handleTabPress} fontsLoaded={fontsLoaded} />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    fontFamily: getFontFamily('regular', false),
  },
});
