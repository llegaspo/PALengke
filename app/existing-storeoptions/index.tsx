import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, KeyboardAvoidingView, Platform, Animated, Easing, LayoutAnimation, UIManager } from 'react-native';
import { useRouter } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { loadFonts, getFontFamily } from '../../components/FontConfig';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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
  const [location, setLocation] = useState('');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Animation refs
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const formAnimation = useRef(new Animated.Value(0)).current;
  const storeOptionsAnimation = useRef(new Animated.Value(0)).current;
  const confirmAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadAppFonts = async () => {
      const success = await loadFonts();
      setFontsLoaded(success);
    };
    loadAppFonts();

    // Stagger entrance animations
    Animated.stagger(200, [
      Animated.timing(titleAnimation, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(formAnimation, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(storeOptionsAnimation, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (selectedStore) {
      Animated.timing(confirmAnimation, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      confirmAnimation.setValue(0);
    }
  }, [selectedStore]);

  const handleStoreSelect = (storeName: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setSelectedStore(storeName);
  };

  const handleConfirm = () => {
    // You can add validation or save logic here
    router.push('/existing-inventory');
  };

  const renderStore = ({ item, index }: { item: typeof storeOptions[0], index: number }) => {
    const isSelected = selectedStore === item.name;
    
    return (
      <TouchableOpacity
        style={[
          styles.square,
          isSelected && styles.selectedSquare,
        ]}
        onPress={() => handleStoreSelect(item.name)}
        activeOpacity={0.7}
      >
        <Image 
          source={item.image} 
          style={[
            styles.storeImage,
            isSelected && styles.selectedStoreImage
          ]} 
          resizeMode="contain" 
        />
        <Text
          style={[
            styles.storeText,
            { fontFamily: getFontFamily(isSelected ? 'bold' : 'regular', fontsLoaded) },
            isSelected && styles.selectedText,
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
        <Animated.View style={{ 
          opacity: titleAnimation, 
          transform: [{ translateY: titleAnimation.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] 
        }}>
          <GradientText text="Let's get to know each other, Ate!" style={styles.title} />
        </Animated.View>

        <Animated.View style={{ 
          opacity: formAnimation, 
          transform: [{ translateY: formAnimation.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] 
        }}>
          <Text style={[styles.label, { fontFamily: getFontFamily('medium', fontsLoaded) }]}>Store Name</Text>
          <TextInput
            style={[styles.input, { fontFamily: getFontFamily('regular', fontsLoaded) }]}
            value={storeName}
            onChangeText={setStoreName}
            placeholder="Enter store name"
            placeholderTextColor="#666"
          />
          <Text style={[styles.text, { fontFamily: getFontFamily('medium', fontsLoaded) }]}>What is your existing store?</Text>
        </Animated.View>

        <Animated.View style={{ 
          opacity: storeOptionsAnimation, 
          transform: [{ translateY: storeOptionsAnimation.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }] 
        }}>
          <FlatList
            data={storeOptions}
            renderItem={renderStore}
            keyExtractor={item => item.name}
            numColumns={3}
            contentContainerStyle={styles.storeOptions}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
        {/* Location input below store options, above confirm button */}
        <Text style={[styles.label, { fontFamily: getFontFamily('medium', fontsLoaded) }]}>Location</Text>
        <TextInput
          style={[styles.input, { fontFamily: getFontFamily('regular', fontsLoaded) }]}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
          placeholderTextColor="#666"
        />
        <View style={{ flex: 1 }} />
        {selectedStore && (
          <View style={{ marginBottom: 24 }}>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} activeOpacity={0.7}>
              <Text style={[styles.confirmButtonText, { fontFamily: getFontFamily('bold', fontsLoaded) }]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#69006c',
    marginBottom: 32,
    letterSpacing: -1,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    padding: 16,
    fontSize: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#2D3748',
    backgroundColor: '#FFFFFF',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 24,
    textAlign: 'center',
  },
  storeOptions: {
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  square: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginBottom: 16,
    marginRight: 12,
    width: (width - 96) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    transform: [{ scale: 1 }],
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSquare: {
    borderColor: '#69006c',
    borderWidth: 2,
    backgroundColor: '#F7FAFC',
    transform: [{ scale: 1.08 }],
    shadowColor: '#69006c',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  storeImage: {
    width: 72,
    height: 52,
    marginBottom: 12,
  },
  selectedStoreImage: {
    width: 84,
    height: 60,
  },
  storeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 16,
  },
  selectedText: {
    color: '#69006c',
    fontWeight: 'bold',
  },
  confirmButton: {
    marginBottom: 24,
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 48,
    backgroundColor: '#69006c',
    borderRadius: 28,
    width: '80%',
    maxWidth: 280,
    shadowColor: '#69006c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});