import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cart');
        setCart(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <header className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {cart.length > 0 ? (
            <div>
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                >
                  <div className="flex items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{item.product.name}</h2>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-xl font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="mt-6 flex justify-between font-bold">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
