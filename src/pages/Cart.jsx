
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const CartPage = () => {
  const { user } = useAuth(); 
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user && user.id) { 
      const fetchCart = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/getCartByUserId/${user.id}`);
          setCart(response.data);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };
      fetchCart();
    }
  }, [user]);

  const updateCartItem = async (productId, newQuantity) => {
    try {
      await axios.put(`http://localhost:4000/updateCartItem/${user.id}/update`, {
        productId,
        quantity: newQuantity,
      });
      // Update local cart state
      setCart(cart.map(item =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/removeFromCart/${user.id}/remove`, {
        data: { productId },
      });
      // Update local cart state
      setCart(cart.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  if (!user) {
    return <p className='flex justify-center'>Please log in to view your cart.</p>;
  }

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
                      <p className="text-gray-600">Quantity: 
                        <input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => updateCartItem(item.product._id, Number(e.target.value))} 
                          className="ml-2 w-16 text-center border border-gray-300 rounded"
                        />
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
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

