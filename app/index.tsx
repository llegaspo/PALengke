import { StyleSheet, Text, View } from 'react-native';
import { db } from "../firebase/firebaseConfig"; 

const Home = () => {
  return (
    <View>
      <Text> WELCOME !</Text>
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
