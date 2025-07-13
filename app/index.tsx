import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View>
      <Text> WELCOME !</Text>
      <Link href="/testGPT">Try GPT</Link>
      <Link href="/testPDF">Try PDF</Link>
    </View>
  )
}

export default Home;

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // white background
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});
