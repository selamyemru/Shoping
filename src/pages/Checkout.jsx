import React, { useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/orders', shippingDetails);
      alert('Order placed successfully');
    } catch (error) {
      console.error(error);
      alert('Order placement failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <header className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={shippingDetails.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="paymentMethod" className="block text-gray-700 text-sm font-medium mb-2">
                Payment Method
              </label>
              <input
                type="text"
                id="paymentMethod"
                name="paymentMethod"
                placeholder="Enter your payment method"
                value={shippingDetails.paymentMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
            >
              Checkout
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
