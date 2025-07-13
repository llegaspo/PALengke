import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getFontFamily } from '../../components/FontConfig';

interface ShopProps {
  fontsLoaded?: boolean;
  onNavigateToShare?: () => void;
}

const Shop: React.FC<ShopProps> = ({ fontsLoaded = true, onNavigateToShare }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: getFontFamily('bold', fontsLoaded) }]}>
        Shop
      </Text>
      <Text style={[styles.subtitle, { fontFamily: getFontFamily('regular', fontsLoaded) }]}>
        Browse our products
      </Text>
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
}); 