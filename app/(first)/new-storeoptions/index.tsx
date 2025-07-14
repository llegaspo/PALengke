import React, { useState, useLayoutEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');

const storeOptions = [
  { name: 'sari-sari', image: require('../../../assets/png/sari.png') },
  { name: 'gulayan', image: require('../../../assets/png/gulayan.png') },
  { name: 'bakery', image: require('../../../assets/png/bakery.png') },
  { name: 'foodstall', image: require('../../../assets/png/foodstall.png') },
  { name: 'butcher', image: require('../../../assets/png/butchery.png') },
];

export default function NewStoreOptions() {
  const navigation = useNavigation()
  const [storeName, setStoreName] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [touched, setTouched] = useState<{storeName: boolean, budget: boolean, location: boolean, store: boolean}>({storeName: false, budget: false, location: false, store: false});
  const router = useRouter();

  const isStoreNameValid = storeName.trim().length > 0;
  const isBudgetValid = budget.trim().length > 0;
  const isLocationValid = location.trim().length > 0;
  const isStoreValid = !!selectedStore;
  const isFormValid = isStoreNameValid && isBudgetValid && isLocationValid && isStoreValid;

  const handleStoreSelect = (storeName: string) => {
    setSelectedStore(storeName);
  };

  const handleConfirm = () => {
    setTouched({storeName: true, budget: true, location: true, store: true});
    if (!isFormValid) return;
    router.push({
      pathname: '/new-suggestions',
      params: {
        storeName,
        selectedStore,
        budget,
        location,
      },
    });
  };

  const renderStore = ({ item, index }: { item: typeof storeOptions[0], index: number }) => {
    const isSelected = selectedStore === item.name;
    // For 3 columns: remove marginRight for last item in each row
    const isLastInRow = (index + 1) % 3 === 0;
    return (
      <TouchableOpacity
        style={[
          styles.square,
          isSelected && styles.selectedSquare,
          isLastInRow && { marginRight: 0 },
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
            isSelected && styles.selectedText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
    });
  }, []);


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Let's start <Text style={styles.titleAccent}>your</Text> business!</Text>
        <Text style={styles.label}>Store Name</Text>
        <TextInput
          style={[styles.input, !isStoreNameValid && touched.storeName && styles.inputError]}
          value={storeName}
          onChangeText={text => { setStoreName(text); if (!touched.storeName) setTouched(t => ({...t, storeName: true})); }}
          placeholder="Enter store name"
          placeholderTextColor="#666"
        />
        <Text style={styles.label}>What store are you planning to start?</Text>
        <View style={styles.optionsWrapper}>
          <FlatList
            key={'store-options-3'}
            data={storeOptions}
            renderItem={renderStore}
            keyExtractor={item => item.name}
            numColumns={3}
            contentContainerStyle={styles.storeOptions}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
          {!isStoreValid && touched.store && (
            <Text style={styles.errorText}>Please select a store type.</Text>
          )}
        </View>
        <Text style={styles.label}>Budget</Text>
        <TextInput
          style={[styles.input, !isBudgetValid && touched.budget && styles.inputError]}
          value={budget}
          onChangeText={text => { setBudget(text); if (!touched.budget) setTouched(t => ({...t, budget: true})); }}
          keyboardType="numeric"
          placeholder="Enter budget"
          placeholderTextColor="#666"
        />
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={[styles.input, !isLocationValid && touched.location && styles.inputError]}
          value={location}
          onChangeText={text => { setLocation(text); if (!touched.location) setTouched(t => ({...t, location: true})); }}
          placeholder="Enter location"
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={[styles.confirmButton, !isFormValid && styles.confirmButtonDisabled, { marginTop: 24 }]}
          onPress={handleConfirm}
          activeOpacity={isFormValid ? 0.7 : 1}
          disabled={!isFormValid}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    flex: 1,
    paddingTop: 18,
    paddingBottom: 100, // Slightly less space for confirm button
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#69006c',
    marginBottom: 18,
    letterSpacing: -1,
    textAlign: 'center',
  },
  titleAccent: {
    color: '#A259C6',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#2D3748',
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  storeOptions: {
    marginBottom: 16,
    paddingHorizontal: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // Remove width to let container padding control the edge
  },
  optionsWrapper: {
    // Remove width to let container padding control the edge
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  square: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 16,
    marginRight: 12,
    width: (width - 2 * 24 - 2 * 12) / 3,
    height: Math.min(120, height * 0.16),
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
    width: '70%',
    height: '55%',
    marginBottom: 8,
    resizeMode: 'contain',
  },
  selectedStoreImage: {
    width: '82%',
    height: '65%',
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
    marginBottom: 12,
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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
  confirmButtonDisabled: {
    backgroundColor: '#d1a6e6',
  },
});
