
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
import Resources from "./resources";
import SideMenu from "../components/SideMenu"; // Added import for SideMenu
LogBox.ignoreAllLogs(false);

// Suppress warnings
LogBox.ignoreLogs([
  'Warning: Invalid prop `style` supplied to `React.Fragment`',
  'Warning: useInsertionEffect must not schedule updates'
]);

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('main'); // 'main' or 'share' or 'resources'
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontLoadingComplete, setFontLoadingComplete] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Sample products data to check for out-of-stock items
  const [products] = useState([
    { id: '1', name: 'tempura', price: 10.0, stock: 0, hasImage: true },
    { id: '2', name: 'fishballs', price: 10.0, stock: 0, hasImage: true },
    { id: '3', name: 'kwek-kwek', price: 10.0, stock: 100, hasImage: true },
    { id: '4', name: 'tempura', price: 0.0, stock: 100, hasImage: true },
    { id: '5', name: 'fishballs', price: 30.0, stock: 100, hasImage: true },
    { id: '6', name: 'kwek-kwek', price: 100.0, stock: 100, hasImage: true },
  ]);

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
    
    // Start on language screen
    setCurrentScreen('language');
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

  const navigateToResources = () => {
    setCurrentScreen('resources');
  };

  const navigateBack = () => {
    setCurrentScreen('main');
  };

  const renderContent = () => {

    if (currentScreen === 'share') {
      return <SharePage fontsLoaded={fontsLoaded} onBack={navigateBack} />;
    }

    if (currentScreen === 'resources') {
      return <Resources fontsLoaded={fontsLoaded} onBack={navigateBack} />;
    }

    if (currentScreen === 'language') {
      // Import and render the language screen
      const LanguageScreen = require('./language').default;
      return <LanguageScreen fontsLoaded={fontsLoaded} onBack={() => setCurrentScreen('main')} />;
    }

    const props = {
      fontsLoaded,
      onNavigateToShare: navigateToShare,
      onNavigateToResources: navigateToResources,
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
          <BottomNavbar activeTab={activeTab} onTabPress={handleTabPress} fontsLoaded={fontsLoaded} products={products} />
        )}
      </View>
      <SideMenu
        isVisible={isMenuVisible}
        onClose={closeMenu}
        fontsLoaded={fontsLoaded}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onNavigateToResources={navigateToResources}
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

