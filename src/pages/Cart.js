import React from 'react';
import { useCart } from '../CartContext';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">ตะกร้าสินค้า</h1>
        <div className="mt-4 grid grid-cols-1 gap-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="relative p-4 border border-gray-300 rounded flex flex-col items-center">
                <img 
                  src={`http://localhost:4000${item.image}`} 
                  alt={item.namepost} 
                  className="w-32 h-32 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold text-center">{item.namepost}</h3>
                <p className="text-sm text-center">{item.description}</p>
                <button 
                  onClick={() => removeFromCart(item)} 
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  ลบออกจากตะกร้า
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">ตะกร้าว่างเปล่า</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
