
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { QRCodeCanvas } from 'qrcode.react';
// UPI details
const UPI_ID = '9121575271@jio';
const PAYEE_NAME = 'Dhanunjaya Rao';

const products = [
  { id: 1, name: 'T-Shirt', price: 1299},
  { id: 2, name: 'Jeans', price:2000 },
    { id: 3, name: 'Sneakers', price: 1999},

];

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${total}&cu=INR`;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-500 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-400 text-center">🛒 Shopping Cart</h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 mb-10">
        {products.map((product) => (
          <ProductCard key={`${product.id}-${product.name}`} product={product} onAdd={() => setCart([...cart, product])} />
        ))}
      </div>

      <div className="bg-yellow-700  text-white p-6 rounded shadow-md">
        <h3 className="text-lg  font-semibold">🧾 Cart Summary</h3>
        <p>Total Items: {cart.length}</p>
        <p>Total Price: ₹{total}</p>

        

        
        {total > 0 && (
          <div className="text-center mt-6">
            <QRCodeCanvas style={{height:'16vh',width:'8vw'}} value={upiLink} size={180} />

            <p className="text-sm mt-2 text-white">✅Scan to pay via UPI</p>

            <p className="mt-2 text-sm">Pay via UPI:</p>
        <p className="text-sm font-semibold">{UPI_ID}</p>

          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
