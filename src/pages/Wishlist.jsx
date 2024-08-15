import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/wishlist');
        setWishlist(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <header className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>Your wishlist is empty.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;
