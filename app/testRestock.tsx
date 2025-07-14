import { handleRestock } from '../lib/AI/restockAI';
import { type  Product } from '../lib/inventory';
import { useState } from 'react';

export const products: Product =[{
  id: 'p1',
  name: 'Tuna',
  cost: 26,
  sellPrice: 30,
  quantity: 40,
  logs: [
  {
    type: 'restock',
    quantity: 40,
    timestamp: new Date(),
    },
  ]
},
  {
    id: 'p2',
    name: 'Sardinas',
    cost: 21,
    sellPrice: 27,
    quantity: 45,
    logs: [
      {
        type: 'restock',
        quantity: 40,
        timestamp: new Date()
      }
    ]
  },
  {
    id: 'p3',
    name: 'Ham',
    cost: 11,
    sellPrice: 18,
    quantity: 50,
    logs: [
      {
      type: 'sale',
      quantity: 3,
      timestamp: new Date('2025-06-12T12:30:00')
    },
      {
      type: 'sale',
      quantity: 30,
      timestamp: new Date('2025-06-10T14:30:00')
    },{
      type: 'sale',
      quantity: 10,
      timestamp: new Date('2025-06-07T10:30:00')
    },{
      type: 'sale',
      quantity: 3,
      timestamp: new Date('2025-05-24T11:30:00')
    },{
      type: 'restock',
      quantity: 50,
      timestamp: new Date('2025-05-23T14:30:00')
    },
    ]
  }
]

export default  function TestRestockAI(){

  const [res, setRes] = useState('');

  const handleSubmit = async() => {
    setRes(await handleRestock(products, 2))
  }

  return(
    <>    <button onClick={handleSubmit}>test Restock</button>
      <div>{res}</div>
</>

  )
}
