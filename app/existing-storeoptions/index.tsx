import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const storeOptions = [
  { name: 'sari-sari', image: require('../../assets/png/sari.png') },
  { name: 'gulayan', image: require('../../assets/png/gulayan.png') },
  { name: 'bakery', image: require('../../assets/png/bakery.png') },
  { name: 'foodstall', image: require('../../assets/png/foodstall.png') },
  { name: 'butcher', image: require('../../assets/png/butchery.png') },
];

function GradientText({ text, style }: { text: string, style?: any }) {
  return (
    <MaskedView maskElement={<Text style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>}>
      <LinearGradient
        colors={["#69006C", "#F396FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

export default function VendorsScreen() {
  const router = useRouter();
  const [storeName, setStoreName] = useState('');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const handleConfirm = () => {
    // You can add validation or save logic here
    router.push('/existing');
  };

  const renderStore = ({ item, index }: { item: typeof storeOptions[0], index: number }) => {
    const isLastInRow = (index + 1) % 3 === 0;
    return (
      <TouchableOpacity
        key={item.name}
        style={[
          styles.square,
          selectedStore === item.name && styles.selectedSquare,
          !isLastInRow && { marginRight: 8 }, // add spacing except last in row
        ]}
        onPress={() => setSelectedStore(item.name)}
        activeOpacity={0.7}
      >
        <Image source={item.image} style={styles.storeImage} resizeMode="contain" />
        <Text
          style={[
            styles.storeText,
            selectedStore === item.name && styles.selectedText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <GradientText text="Let's get to know each other, Ate!" style={styles.title} />

        <Text style={styles.label}>Store Name</Text>
        <TextInput
          style={styles.input}
          value={storeName}
          onChangeText={setStoreName}
          placeholder="Enter store name"
          placeholderTextColor="#666"
        />

        <Text style={styles.text}>What is your existing store?</Text>

        <FlatList
          data={storeOptions}
          renderItem={renderStore}
          keyExtractor={item => item.name}
          numColumns={3}
          contentContainerStyle={styles.storeOptions}
          columnWrapperStyle={{ marginBottom: 12 }}
          scrollEnabled={false}
        />

        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} activeOpacity={0.7}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    maxWidth: 390,
    flex: 1,
    minHeight: '100%',
    alignSelf: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#69006c', // fallback for gradient
    marginBottom: 16,
    letterSpacing: -2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BA6AD4',
    color: '#333',
    backgroundColor: '#D9D9D9',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    marginBottom: 8,
  },
  storeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 24,
    padding: 0,
  },
  square: {
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    width: (width - 72) / 3.1, // 3 columns, slight adjustment for no gap
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedSquare: {
    borderColor: '#69006c',
    borderWidth: 2,
    backgroundColor: '#f3e6fa',
  },
  storeImage: {
    width: 80,
    height: 56,
    marginBottom: 8,
  },
  storeText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  selectedText: {
    color: '#69006c',
    fontWeight: 'bold',
  },
  confirmButton: {
    marginBottom: 16,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#ba6ada',
    borderRadius: 999,
    width: 208,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});