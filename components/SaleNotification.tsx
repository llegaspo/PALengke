import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SaleNotificationProps {
  visible: boolean;
  productName: string;
  amount?: number;
  quantity: number;
  onHide: () => void;
  type?: 'sale' | 'undo' | 'outOfStock';
}

const SaleNotification: React.FC<SaleNotificationProps> = ({ visible, productName, amount, quantity, onHide, type = 'sale' }) => {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 100,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  if (type === 'outOfStock') {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
        pointerEvents="none"
      >
        <View style={styles.outOfStockInner}>
          <Ionicons name="alert-circle-outline" size={26} color="#e11d48" style={{ marginRight: 8, marginLeft: 2 }} />
          <Text style={styles.outOfStockLabel}>Out of stock:</Text>
          <Text style={styles.outOfStockName}>{productName}</Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
      pointerEvents="none"
    >
      <View style={styles.popupInner}>
        {type === 'undo' && (
          <Ionicons name="arrow-undo-outline" size={26} color="#111" style={{ marginRight: 8, marginLeft: 2 }} />
        )}
        {type === 'undo' && <Text style={styles.popupLabel}>Undo:</Text>}
        <Text style={styles.popupQty}>x{quantity}</Text>
        <Text style={styles.popupName}>{productName}</Text>
        {type === 'sale' && amount !== undefined && (
          <Text style={styles.popupAmount}>+₱{amount.toFixed(2)}</Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 80,
    alignItems: 'center',
    zIndex: 100,
  },
  popupInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
    minWidth: 220,
    borderWidth: 0,
    marginHorizontal: 8,
  },
  popupLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 14,
    color: '#111',
  },
  popupQty: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 6,
    color: '#111',
  },
  popupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginRight: 4,
  },
  popupAmount: {
    color: '#16A34A',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 2,
  },
  // Out of stock styles
  outOfStockInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 10,
    minWidth: 220,
    borderWidth: 2,
    borderColor: '#ef4444',
    marginHorizontal: 8,
  },
  outOfStockLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 14,
    color: '#e11d48',
  },
  outOfStockName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e11d48',
    marginRight: 4,
  },
});

export default SaleNotification; 