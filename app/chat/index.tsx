import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getFontFamily } from '../../components/FontConfig';

interface ChatProps {
  fontsLoaded?: boolean;
}

const Chat: React.FC<ChatProps> = ({ fontsLoaded = true }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: getFontFamily('bold', fontsLoaded) }]}>
        Chat
      </Text>
      <Text style={[styles.subtitle, { fontFamily: getFontFamily('regular', fontsLoaded) }]}>
        Start a conversation
      </Text>
    </View>
  );
};

export default Chat;

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