import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

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

interface Product {
  id: string;
  name: string;
  pcs: number;
  cost: number;
  price: number;
  image: any;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'tempura',
    pcs: 100,
    cost: 10,
    price: 12,
    image: require('../../assets/png/fishball.png'),
  },
];

export default function ExistingInventoryScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<null | (Product & { pcsStr: string; costStr: string; priceStr: string })>(null);
  const [newProduct, setNewProduct] = useState<null | (Product & { pcsStr: string; costStr: string; priceStr: string })>(null);
  const [capital, setCapital] = useState(1000);

  // Custom scrollbar state
  const [scrollY, setScrollY] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);

  const handleEdit = (product: Product) => setEditingProduct({
    ...product,
    pcsStr: product.pcs.toString(),
    costStr: product.cost.toString(),
    priceStr: product.price.toString(),
  });
  const handleDelete = (id: string) => setProducts(products.filter(p => p.id !== id));
  const handleSave = (product: Product & { pcsStr: string; costStr: string; priceStr: string }) => {
    setProducts(products.map(p =>
      (p.id === product.id ? {
        ...product,
        pcs: Number(product.pcsStr) || 0,
        cost: Number(product.costStr) || 0,
        price: Number(product.priceStr) || 0,
      } : p)
    ));
    setEditingProduct(null);
  };
  const handleCancel = () => setEditingProduct(null);

  const handleAdd = () => {
    setNewProduct({
      id: (Math.random() * 100000).toFixed(0),
      name: '',
      pcs: 0,
      cost: 0,
      price: 0,
      image: require('../../assets/png/fishball.png'),
      pcsStr: '',
      costStr: '',
      priceStr: '',
    });
  };
  const handleSaveNew = () => {
    if (newProduct) {
      setProducts([
        ...products,
        {
          ...newProduct,
          pcs: Number(newProduct.pcsStr) || 0,
          cost: Number(newProduct.costStr) || 0,
          price: Number(newProduct.priceStr) || 0,
        },
      ]);
      setNewProduct(null);
    }
  };
  const handleCancelNew = () => setNewProduct(null);

  // Calculate scrollbar height and position
  const scrollbarMargin = 20; // margin at top and bottom
  const scrollbarHeight = 100;
  const maxScroll = contentHeight - containerHeight;
  let rawTop = maxScroll > 0 ? (scrollY / maxScroll) * (containerHeight - scrollbarHeight - 2 * scrollbarMargin) : 0;
  rawTop = Math.max(0, Math.min(rawTop, containerHeight - scrollbarHeight - 2 * scrollbarMargin));
  const scrollbarTop = scrollbarMargin + rawTop;

  return (
    <View style={styles.container}>
      {/* Header: always left-aligned, outside blurBox */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backArrow}>
        <Image source={require('../../assets/png/arrowleft.png')} style={styles.backArrowImage} />
      </TouchableOpacity>
      <GradientText text="Let's set you up!" style={styles.title} />
      <Text style={styles.subheading}>Start by listing your existing products.</Text>
      {/* BlurBox: always same width and alignment */}
      <View style={styles.blurBox}>
        <ScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}
          onScroll={e => setScrollY(e.nativeEvent.contentOffset.y)}
          onContentSizeChange={(w, h) => setContentHeight(h)}
          onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
          scrollEventThrottle={16}
        >
          {products.map((product) =>
            editingProduct && editingProduct.id === product.id ? (
              // --- EDIT MODE CARD ---
              <View key={product.id} style={styles.productCard}>
                <View style={styles.editTopRow}>
                  <View style={styles.editImageCircle}>
                    <Image source={require('../../assets/png/addimgbtn.png')} style={{ width: 21, height: 21, tintColor: 'black' }} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.editLabel}>product name</Text>
                    <TextInput
                      style={styles.editNameInput}
                      value={editingProduct.name}
                      onChangeText={v => setEditingProduct({ ...editingProduct, name: v })}
                      placeholder="Product name"
                      placeholderTextColor="#aaa"
                    />
                  </View>
                </View>
                <View style={styles.editFieldsRow}>
                  <View style={styles.editFieldBox}>
                    <Text style={styles.editFieldLabel}>pcs</Text>
                    <TextInput
                      style={styles.editFieldInput}
                      value={editingProduct.pcsStr}
                      onChangeText={v => setEditingProduct({ ...editingProduct, pcsStr: v.replace(/[^0-9]/g, '') })}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.editFieldBox}>
                    <Text style={styles.editFieldLabel}>cost</Text>
                    <View style={styles.editPesoBox}><Text style={styles.editPeso}>P</Text></View>
                    <TextInput
                      style={styles.editFieldInput}
                      value={editingProduct.costStr}
                      onChangeText={v => setEditingProduct({ ...editingProduct, costStr: v.replace(/[^0-9.]/g, '') })}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.editFieldBox}>
                    <Text style={styles.editFieldLabel}>price</Text>
                    <View style={styles.editPesoBox}><Text style={styles.editPeso}>P</Text></View>
                    <TextInput
                      style={styles.editFieldInput}
                      value={editingProduct.priceStr}
                      onChangeText={v => setEditingProduct({ ...editingProduct, priceStr: v.replace(/[^0-9.]/g, '') })}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.editActionsRow}>
                  <TouchableOpacity style={[styles.deleteIcon, { backgroundColor: 'transparent', padding: 0 }]} onPress={() => { handleDelete(product.id); setEditingProduct(null); }}>
                    <Image source={require('../../assets/png/deletebtn.png')} style={{ width: 32, height: 32 }} />
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                      <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={() => handleSave(editingProduct)}>
                      <Text style={styles.saveBtnText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              // --- VIEW MODE CARD ---
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productRow}>
                  <View style={styles.productImageCircle} />
                  <View style={styles.productInfoStack}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPcs}>{product.pcs} pcs</Text>
                  </View>
                  <View style={styles.productDetailsEditRow}>
                    <View style={styles.productDetailsStack}>
                      <Text style={styles.productInfoGray}>cost: P{product.cost.toFixed(2)}</Text>
                      <Text style={styles.productInfoGray}>total cost: P{(product.pcs * product.cost).toFixed(2)}</Text>
                      <Text style={styles.productInfoGray}>price/pc: P{product.price.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.editIconImg} onPress={() => handleEdit(product)}>
                      <Image source={require('../../assets/png/editbtn.png')} style={styles.editImg} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          )}
          {newProduct && (
            <View style={styles.productCard}>
              <View style={styles.editTopRow}>
                <View style={styles.editImageCircle}>
                  <Image source={require('../../assets/png/addimgbtn.png')} style={{ width: 21, height: 21, tintColor: 'black' }} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.editLabel}>product name</Text>
                  <TextInput
                    style={styles.editNameInput}
                    value={newProduct.name}
                    onChangeText={v => setNewProduct({ ...newProduct, name: v })}
                    placeholder="Product name"
                    placeholderTextColor="#aaa"
                  />
                </View>
              </View>
              <View style={styles.editFieldsRow}>
                <View style={styles.editFieldBox}>
                  <Text style={styles.editFieldLabel}>pcs</Text>
                  <TextInput
                    style={styles.editFieldInput}
                    value={newProduct.pcsStr}
                    onChangeText={v => setNewProduct({ ...newProduct, pcsStr: v.replace(/[^0-9]/g, '') })}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.editFieldBox}>
                  <Text style={styles.editFieldLabel}>cost</Text>
                  <View style={styles.editPesoBox}><Text style={styles.editPeso}>P</Text></View>
                  <TextInput
                    style={styles.editFieldInput}
                    value={newProduct.costStr}
                    onChangeText={v => setNewProduct({ ...newProduct, costStr: v.replace(/[^0-9.]/g, '') })}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.editFieldBox}>
                  <Text style={styles.editFieldLabel}>price</Text>
                  <View style={styles.editPesoBox}><Text style={styles.editPeso}>P</Text></View>
                  <TextInput
                    style={styles.editFieldInput}
                    value={newProduct.priceStr}
                    onChangeText={v => setNewProduct({ ...newProduct, priceStr: v.replace(/[^0-9.]/g, '') })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.editActionsRow}>
                <TouchableOpacity style={[styles.deleteIcon, { backgroundColor: 'transparent', padding: 0 }]} onPress={handleCancelNew}>
                  <Image source={require('../../assets/png/deletebtn.png')} style={{ width: 32, height: 32 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelNew}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveBtn} onPress={handleSaveNew}>
                    <Text style={styles.saveBtnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        {/* Custom Scrollbar Overlay */}
        <View pointerEvents="none" style={[styles.scrollWheel, { height: scrollbarHeight, top: scrollbarTop }]}>
          <Image
            source={require('../../assets/png/scrollbar.png')}
            style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
          />
        </View>
      </View>
      {/* Bottom row and confirm button remain unchanged */}
      <View style={styles.bottomRow}>
        <Text style={styles.capitalText}>Capital: P{capital.toLocaleString()}</Text>
        <View style={styles.fabRow}>
          <TouchableOpacity style={styles.fabBtn} onPress={handleAdd}>
            <Image source={require('../../assets/png/addbtn.png')} style={styles.fabImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabBtn}>
            <Image source={require('../../assets/png/camerabtn.png')} style={styles.fabImg} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.confirmBtn}>
        <Text style={styles.confirmBtnText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    maxWidth: 390,
    marginHorizontal: 'auto',
    padding: 16,
    backgroundColor: '#fdfdfd',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  backArrow: {
    width: 34,
    height: 34,
    marginBottom: 8,
  },
  backArrowImage: {
    width: 34,
    height: 34,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#69006c',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
    textAlign: 'left',
  },
  blurBox: {
    backgroundColor: '#dbcfdf',
    borderRadius: 24,
    padding: 16, // This gives equal space left and right
    width: '100%',
    minHeight: 320,
    maxHeight: height * 0.55,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  scrollArea: {
    height: '100%',
    paddingRight: 8,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 12, // balanced padding
    width: '100%',
    alignSelf: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    paddingVertical: 3,
  },
  productImageCircle: {
    width: 61,
    height: 61,
    borderRadius: 45,
    backgroundColor: '#d9d9d9',
    marginRight: 8, // small gap to text
  },
  productName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 0,
  },
  productPcs: {
    fontSize: 11,
    color: '#444',
    marginBottom: 0,

  },
  productInfoCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 8,
    minWidth: 120,
  },
  productInfoGray: {
    color: '#888',
    fontSize: 10,
    marginBottom: 0,
    textAlign: 'right',
    fontWeight: '400',
    marginLeft: 20,
    paddingLeft:-16,
  },
  editIconImg: {
    alignSelf: 'center',
    marginLeft: 4, // small gap from cost
    marginTop: 0,
    padding: 0,
  },
  editImg: {
    width: 22, // reduced from 28
    height: 22, // reduced from 28
    resizeMode: 'contain',
  },
  editCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
    padding: 16,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  editImageCircle: {
    width: 61,
    height: 61,
    borderRadius: 45,
    backgroundColor: '#d9d9d9',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  editLabel: {
    fontSize: 13,
    color: '#111',
    fontWeight: 'bold',
    marginBottom: 2,
    marginLeft: 2,
  },
  editNameInput: {
    backgroundColor: '#ededed',
    borderRadius: 8,
    padding: 8,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#69006c',
    marginBottom: 2,
  },
  editFieldsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  editFieldBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  editFieldLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  editFieldInput: {
    backgroundColor: '#ededed',
    borderRadius: 8,
    padding: 6,
    fontSize: 16,
    color: '#69006c',
    textAlign: 'center',
    marginBottom: 2,
    width: 48,
  },
  editPesoBox: {
    position: 'absolute',
    left: 4,
    top: 22,
    zIndex: 1,
  },
  editPeso: {
    color: '#b9b9b9',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  deleteIcon: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  cancelBtn: {
    backgroundColor: 'white',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ba6ada',
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginRight: 8,
  },
  cancelBtnText: {
    color: '#ba6ada',
    fontWeight: 'bold',
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: '#ba6ada',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  saveBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  capitalText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  fabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  fabBtn: {
    backgroundColor: '#f3e6fa',
    borderRadius: 32,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  fabIcon: {
    fontSize: 28,
    color: '#ba6ada',
    fontWeight: 'bold',
  },
  fabImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  confirmBtn: {
    backgroundColor: '#ba6ada',
    borderRadius: 32,
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: Platform.OS === 'ios' ? 24 : 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  confirmBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  productInfoStack: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 0, // move closer to left
    minWidth: 50,
    flex: 1,
  },
  productDetailsStack: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 80, // reduced from 120
    marginRight: 0, // no extra gap
  },
  productDetailsEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 100, // reduced from 150
    flex: 0,
  },
  editTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  scrollWheel: {
    position: 'absolute',
    right: 0, // flush to the rightmost edge
    width: 20, // or your image width
    resizeMode: 'stretch',
    zIndex: 10,
  },
});