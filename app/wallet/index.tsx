import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getFontFamily } from '../../components/FontConfig';

interface WalletProps {
  fontsLoaded?: boolean;
}

const Wallet: React.FC<WalletProps> = ({ fontsLoaded = true }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: getFontFamily('bold', fontsLoaded) }]}>
        Wallet
      </Text>
      <Text style={[styles.subtitle, { fontFamily: getFontFamily('regular', fontsLoaded) }]}>
        Manage your finances
      </Text>
    </View>
  );
};

export default Wallet;

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