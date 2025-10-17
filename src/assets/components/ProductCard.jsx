import React from 'react';

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-center">
      <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={() => onAdd(product)}
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-900"
      >
        ✅ Add to Cart 
      </button>
    </div>
  );
};

export default ProductCard;
