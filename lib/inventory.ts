import AsyncStorage from '@react-native-async-storage/async-storage';
import { sampleProducts } from '../app/testRestock';

const STORAGE_KEY = 'inventory';

type StockLog = {
  type: 'restock' | 'sale';
  quantity: number;
  timestamp: Date;
}


export interface Product {
  id: string;
  name: string;
  cost: number;
  sellPrice: number;
  quantity: number;
  logs: StockLog[];
}


export const getProducts = async() => {
  try{
    const storedProducts = await AsyncStorage.getItem(STORAGE_KEY);

    if(storedProducts){
      return JSON.parse(storedProducts);
    }
    return [];
  } catch(e){
    console.error('Failed to get products');
    return [];
  }
}

export const addProducts = async(newProduct: Product) => {
  const products = await getProducts();
  const updatedProducts = [...products, newProduct];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
}

export const sellProduct = async (id: string) => {
    const products : Product[] = await getProducts();
    const updatedProducts = products.map((product) => {
      if(product.id === id && product.quantity > 0) {
        return {
          ...product,
          quantity: product.quantity - 1,
          logs: [
            ...product.logs,
            {
              type: 'sale',
              quantity: 1,
              timestamp: new Date().toISOString(),
          },
        ],
      };
    }
    return product;
  });

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  }

  const restockProduct = async (id: string, qty: number ) => {
    const products: Product[] = await getProducts();
    const updatedProducts = products.map((product) => {
      if(product.id === id){
      return {
        ...product,
        quantity: product.quantity + qty,
        logs: [
          ...product.logs,
          {
            type: 'sale',
            quantity: qty,
            timestamp: new Date().toISOString(),
        },
      ],
    }
    }
    return product;
  });
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  }

export const LoadSampleProducts = async() => {
for(const pr of sampleProducts){
  await addProducts(pr);
}
}
