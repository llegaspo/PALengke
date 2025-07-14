
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, LogBox } from 'react-native';
import { db } from "../firebase/firebaseConfig";
import BottomNavbar from "../components/BottomNavbar";
import { loadFonts, getFontFamily } from "../components/FontConfig";
import Home from "./home";
import Shop from "./shop";
import Chat from "./chat";
import Wallet from "./wallet";
import SharePage from "./share";
import SideMenu from "../components/SideMenu"; // Added import for SideMenu
LogBox.ignoreAllLogs(false);

// Suppress the Expo Router Fragment warning
LogBox.ignoreLogs(['Warning: Invalid prop `style` supplied to `React.Fragment`']);

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('main'); // 'main' or 'share'
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontLoadingComplete, setFontLoadingComplete] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
  const closeMenu = () => setIsMenuVisible(false);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    setCurrentScreen('main'); // Always go back to main screen when tab is pressed
  };

  const navigateToShare = () => {
    setCurrentScreen('share');
  };

  const navigateBack = () => {
    setCurrentScreen('main');
  };

  const renderContent = () => {

    if (currentScreen === 'share') {
      return <SharePage fontsLoaded={fontsLoaded} onBack={navigateBack} />;
    }

    const props = {
      fontsLoaded,
      onNavigateToShare: navigateToShare,
      toggleMenu: toggleMenu, // Pass toggleMenu function
    };
    switch (activeTab) {
      case 'home':
        return <Home {...props} />;
      case 'shop':
        return <Shop {...props} />;
      case 'chat':
        return <Chat {...props} />;
      case 'wallet':
        return <Wallet />;
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
        {currentScreen === 'main' && (
          <BottomNavbar activeTab={activeTab} onTabPress={handleTabPress} fontsLoaded={fontsLoaded} />
        )}
      </View>
      <SideMenu
        isVisible={isMenuVisible}
        onClose={closeMenu}
        fontsLoaded={fontsLoaded}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
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

