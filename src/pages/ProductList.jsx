
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRating from '../Component/Product/StarRating'; 
import { useAuth } from '../context/AuthContext';
const ProductListPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getAllProducts');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const toggleDescription = (id) => {
    setExpandedProductId(expandedProductId === id ? null : id);
  };

  const handleRatingChange = async (productId, newRating) => {
    try {
      await axios.put(`http://localhost:4000/api/products/${productId}`, {
        rating: newRating
      });
      setProducts(products.map(product =>
        product._id === productId ? { ...product, rating: newRating } : product
      ));
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    if (user) {
      try {
        await axios.post(`http://localhost:4000/addToCart/${user.id}/add`, {
          productId
        });
        alert('Product added to cart!');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else {
      alert('You must be logged in to add items to the cart.');
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <header className="py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold">Product List</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">
                  {expandedProductId === product._id
                    ? product.description
                    : product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </p>
                <button
                  onClick={() => toggleDescription(product._id)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  {expandedProductId === product._id ? 'Less' : 'More'}
                </button>
                <StarRating
                  rating={product.rating}
                  onRatingChange={(newRating) => handleRatingChange(product._id, newRating)}
                />
                <p className="text-xl font-bold mt-4">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;

