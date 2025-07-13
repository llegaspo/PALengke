import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { ChatBot } from '../lib/AI/chatBot';

export default function TestGPT(){
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading]=useState(false);

  const handleSubmit = async() => {
    setLoading(true);
    const reply = await ChatBot(prompt);
    setResponse(reply);
    setLoading(false);
  };

  return(
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What can I help you?"
        value={prompt}
        onChangeText={setPrompt}
        />
      <Button
        title={loading ? 'Loading...' : 'send'}
        onPress={handleSubmit}
        disabled={loading}
        />
      <Text style={styles.output}>{response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  output: {
    marginTop: 20,
    fontSize: 16,
  },
})
