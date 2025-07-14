import React, {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

export default function NewSuggestions() {
  const navigation = useNavigation();
  const { storeName, selectedStore, budget, location } = useLocalSearchParams();
  const router = useRouter();

  useLayoutEffect(() => {
  navigation.setOptions({
    headerBackVisible: false,
  });
}, []);


  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/new-storeoptions')}>
        <Ionicons name="arrow-back" size={28} color="#A259C6" />
      </TouchableOpacity>
      {/* Title and Info */}
      <Text style={styles.title}>Business Idea:</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Store Type Chosen:</Text>
        <Text style={styles.infoValue}>{selectedStore}</Text>
        <Text style={styles.infoLabel}>Location:</Text>
        <Text style={styles.infoValue}>{location}</Text>
        <Text style={styles.infoLabel}>Input Budget:</Text>
        <Text style={styles.infoValue}>₱{budget}</Text>
      </View>
      {/* Placeholder for product/inventory suggestion cards */}
      <View style={styles.suggestionCard}>
        <Text style={styles.suggestionTitle}>Squidballs</Text>
        <View style={styles.suggestionRow}>
          <Text style={styles.suggestionDetail}>200 pcs.</Text>
          <Text style={styles.suggestionDetail}>cost: ₱8.00</Text>
        </View>
        <View style={styles.suggestionRow}>
          <Text style={styles.suggestionDetail}>total cost: ₱1600.00</Text>
          <Text style={styles.suggestionDetail}>price/pc: ₱12.00</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={24} color="#A259C6" />
        </TouchableOpacity>
      </View>
      {/* Placeholder for more suggestion cards */}
      <View style={styles.suggestionCardEmpty} />
      <View style={styles.suggestionCardEmpty} />
      {/* Puhunan Planner Section */}
      <View style={styles.plannerBox}>
        <Text style={styles.plannerText}>Puhunan Planner</Text>
        <Text style={styles.plannerText}>Input Budget: ₱{budget}</Text>
        <Text style={styles.plannerText}>Recommended Allocation:</Text>
        <Text style={styles.plannerText}>• ₱1,600 – Starter inventory (above)</Text>
        <Text style={styles.plannerText}>• ₱400 – Portable setup (gas stove, pan, utensils)</Text>
      </View>
      {/* Bottom Buttons */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.regenBtn}>
          <Text style={styles.regenText}>Regenerate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmBtn} onPress={() => router.push('/new-inventory')}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 0,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 36,
    left: 18,
    zIndex: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A259C6',
    marginTop: 60,
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 32,
  },
  infoBox: {
    alignSelf: 'stretch',
    marginHorizontal: 32,
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#BFA6D6',
    paddingBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 2,
  },
  infoValue: {
    fontSize: 17,
    color: '#000',
    marginBottom: 2,
    marginLeft: 8,
  },
  suggestionCard: {
    backgroundColor: '#E9DDF0',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 32,
    marginTop: 18,
    marginBottom: 8,
    alignSelf: 'stretch',
    shadowColor: '#A259C6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 80,
    position: 'relative',
  },
  suggestionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    marginBottom: 2,
  },
  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  suggestionDetail: {
    fontSize: 14,
    color: '#444',
  },
  addBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 2,
    shadowColor: '#A259C6',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionCardEmpty: {
    backgroundColor: '#E9DDF0',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 32,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'stretch',
    minHeight: 80,
  },
  plannerBox: {
    alignSelf: 'stretch',
    marginHorizontal: 32,
    marginTop: 18,
    marginBottom: 8,
  },
  plannerText: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    position: 'absolute',
    bottom: 32,
    left: '10%',
  },
  regenBtn: {
    backgroundColor: '#fff',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#A259C6',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginRight: 12,
  },
  regenText: {
    color: '#A259C6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmBtn: {
    backgroundColor: '#A259C6',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginLeft: 12,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
