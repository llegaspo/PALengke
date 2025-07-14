import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface SaleNotificationProps {
  visible: boolean;
  productName: string;
  amount?: number;
  quantity: number;
  onHide: () => void;
  type?: 'sale' | 'undo' | 'outOfStock';
  items?: { name: string; quantity: number; amount: number }[];
}

const SaleNotification: React.FC<SaleNotificationProps> = ({ visible, productName, amount, quantity, onHide, type = 'sale', items }) => {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const iconScale = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset all animations
      translateY.setValue(100);
      opacity.setValue(0);
      scale.setValue(0.8);
      iconScale.setValue(0);
      shimmerAnim.setValue(0);

      // Entrance animations
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 7,
        }),
      ]).start(() => {
        // Icon pop animation after main animation
        Animated.spring(iconScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 150,
          friction: 8,
        }).start();

        // Shimmer effect for sale type
        if (type === 'sale') {
          Animated.loop(
            Animated.sequence([
              Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: false,
              }),
              Animated.timing(shimmerAnim, {
                toValue: 0,
                duration: 1200,
                useNativeDriver: false,
              }),
            ])
          ).start();
        }
      });

      // Auto-hide timer with exit animation
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 100,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.8,
            duration: 350,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, type === 'sale' ? 2800 : 1800); // Longer duration for multi-item sales

      return () => clearTimeout(timer);
    }
  }, [visible, type]);

  if (!visible) return null;

  const renderSaleNotification = () => (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
      pointerEvents="none"
    >
      <LinearGradient
        colors={['#16A34A', '#22C55E', '#4ADE80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.saleGradient, items && items.length > 1 && { width: 320 }]} // Wider for multiple items
      >
        <View style={styles.saleContent}>
          <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }] }]}>
            <Ionicons name="checkmark-circle" size={28} color="#fff" />
          </Animated.View>
          
          <View style={styles.textContainer}>
            {items && items.length > 1 ? (
              // Multi-item display
              <View style={styles.multiItemContainer}>
                <View style={styles.headerRow}>
                  <Text style={styles.multiItemHeader}>{productName}</Text>
                  <Text style={styles.totalAmount}>₱{amount?.toFixed(2)}</Text>
                </View>
                <View style={styles.itemsList}>
                  {items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                        <Text style={styles.itemName}>{item.name}</Text>
                      </View>
                      <Text style={styles.itemAmount}>₱{item.amount.toFixed(2)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              // Single item display
              <View>
                <View style={styles.productRow}>
                  <Text style={styles.quantityBadge}>x{quantity}</Text>
                  <Text style={styles.productName}>{productName}</Text>
                </View>
                {amount !== undefined && (
                  <Text style={styles.amountText}>+₱{amount.toFixed(2)}</Text>
                )}
              </View>
            )}
          </View>
        </View>
        
        {/* Shimmer overlay */}
        <Animated.View
          style={[
            styles.shimmerOverlay,
            {
              transform: [
                {
                  translateX: shimmerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-width, width],
                  }),
                },
              ],
            },
          ]}
        />
      </LinearGradient>
    </Animated.View>
  );

  const renderUndoNotification = () => (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
      pointerEvents="none"
    >
      <View style={[styles.undoContainer, items && items.length > 1 && { width: 320 }]}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }] }]}>
          <Ionicons name="arrow-undo-circle" size={28} color="#F59E0B" />
        </Animated.View>
        
        <View style={styles.textContainer}>
          {items && items.length > 1 ? (
            // Multi-item undo display
            <View style={styles.multiItemContainer}>
              <View style={styles.headerRow}>
                <Text style={styles.undoMultiHeader}>Undo {productName}</Text>
                <Text style={styles.undoTotalAmount}>₱{amount?.toFixed(2)}</Text>
              </View>
              <View style={styles.itemsList}>
                {items.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.undoItemQuantity}>x{item.quantity}</Text>
                      <Text style={styles.undoItemName}>{item.name}</Text>
                    </View>
                    <Text style={styles.undoItemAmount}>₱{item.amount.toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            // Single item undo display
            <View>
              <Text style={styles.undoLabel}>Undo</Text>
              <View style={styles.productRow}>
                <Text style={[styles.quantityBadge, { backgroundColor: '#FEF3C7', color: '#92400E' }]}>x{quantity}</Text>
                <Text style={[styles.productName, { color: '#1F2937' }]}>{productName}</Text>
              </View>
              {amount !== undefined && (
                <Text style={styles.undoAmountText}>₱{amount.toFixed(2)}</Text>
              )}
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );

  const renderOutOfStockNotification = () => (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
      pointerEvents="none"
    >
      <View style={styles.outOfStockContainer}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }] }]}>
          <Ionicons name="alert-circle" size={28} color="#EF4444" />
        </Animated.View>
        
        <View style={styles.textContainer}>
          <Text style={styles.outOfStockLabel}>Out of Stock</Text>
          <Text style={[styles.productName, { color: '#DC2626' }]}>{productName}</Text>
        </View>
      </View>
    </Animated.View>
  );

  switch (type) {
    case 'undo':
      return renderUndoNotification();
    case 'outOfStock':
      return renderOutOfStockNotification();
    default:
      return renderSaleNotification();
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginHorizontal: 20,
    bottom: 100,
    alignItems: 'center',
    zIndex: 1000,
  },
  saleGradient: {
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
    minWidth: 240,
    maxWidth: width - 40, // Ensures it never exceeds the screen minus margins
    alignSelf: 'center',
  },
  saleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  undoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#FDE68A',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    width: 280,
  },
  outOfStockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#FECACA',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    width: 280,
  },
  iconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  quantityBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
    overflow: 'hidden',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
  },
  undoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 2,
  },
  outOfStockLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 2,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 100,
    transform: [{ skewX: '-20deg' }],
  },
  multiItemContainer: {
    marginTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  multiItemHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'capitalize',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
  },
  itemsList: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    paddingTop: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemInfo: {
    flex: 1,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.5,
  },
     undoMultiHeader: {
     fontSize: 18,
     fontWeight: '700',
     color: '#92400E',
     textTransform: 'capitalize',
   },
   undoTotalAmount: {
     fontSize: 18,
     fontWeight: '700',
     color: '#92400E',
     letterSpacing: -0.5,
   },
   undoItemQuantity: {
     fontSize: 14,
     fontWeight: '600',
     color: '#92400E',
     marginBottom: 2,
   },
   undoItemName: {
     fontSize: 14,
     fontWeight: '500',
     color: '#92400E',
   },
   undoItemAmount: {
     fontSize: 14,
     fontWeight: '600',
     color: '#92400E',
     letterSpacing: -0.5,
   },
   undoAmountText: {
     fontSize: 16,
     fontWeight: '600',
     color: '#92400E',
     letterSpacing: -0.5,
     marginTop: 4,
   },
});

export default SaleNotification; 