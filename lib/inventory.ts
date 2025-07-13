import { useState, useEffect } from 'react';

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

type inputArg = {
  open: boolean;
  onClose: () => void;
  products: Product;
}
export default function Inventory(props: inputArg){
  const [inventory, setInventory] = useState<Product[]>([])

  const sellProduct = (id: string) => {
    setInventory((prev) =>(
      prev.map((product) => {
        if(product.id === id && product.quantity > 0){
          return {
            ...product,
            quantity: product.quantity - 1,
            logs: [
              ...product.logs,
              {
                type: 'sale',
                quantity: 1,
                timestamp: new Date(),
              },
            ],
          };
        }

        return product;
      })
    )
    )
  }

  const restockProduct = (id: string, qty: number ) => {
    setInventory((prev) =>
      prev.map((product) => {
        if(product.id === id){
          return {
            ...product,
            quantity: product.quantity + qty,
            logs: [
              ...product.logs,
              {
                type: 'restock',
                quantity: qty,
                timestamp: new Date(),
              }
            ]
          }
        }
        return product;
      })

      )
  }

  return{
    inventory,
    sellProduct,
    restockProduct,
  }
}
