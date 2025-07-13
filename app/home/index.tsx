import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getFontFamily } from '../../components/FontConfig';

interface HomeProps {
  fontsLoaded?: boolean;
}

const Home: React.FC<HomeProps> = ({ fontsLoaded = true }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: getFontFamily('bold', fontsLoaded) }]}>
        WELCOME!
      </Text>
      <Text style={[styles.subtitle, { fontFamily: getFontFamily('regular', fontsLoaded) }]}>
        PALengke - Your Local Marketplace
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 