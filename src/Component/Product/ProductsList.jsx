import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProductEditModal from './ProductEdit';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedProductId, setExpandedProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/getAllProducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSave = () => {
    fetchProducts();
  };
  const toggleDescription = (id) => {
    setExpandedProductId(expandedProductId === id ? null : id);
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <header className="text-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between">
          <h1 className="text-2xl font-bold">Product List</h1>
          <Link to='/addproduct' className='text-gray-800 px-4 my-4 border border-gray-400 rounded hover:bg-gray-200 transition'>
            Create Product
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {products.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead >
              <tr >
                <th className="py-3 px-6 border-b border-gray-200 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Image</th>
                <th className="py-3 px-6 border-b border-gray-200 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 border-b border-gray-200 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Description</th>
                <th className="py-3 px-6 border-b border-gray-200 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Category</th>
                <th className="py-3 px-6 border-b border-gray-200 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Stock</th>
                <th className="py-3 px-6 border-b border-gray-200 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Rating</th>
                <th className="py-3 px-6 border-b border-gray-200 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Price</th>
                <th className="py-3 px-6 border-b border-gray-200 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <img src={product.image} alt={product.name} className="w-14 h-14 object-cover" />
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 text-sm">{product.name}</td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <p className="text-gray-800 text-sm mb-4">
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
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">{product.category}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{product.stock}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{product.rating}</td>
                  <td className="py-4 px-6 border-b border-gray-200">${product.price.toFixed(2)}</td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No products available</p>
        )}
        {isModalOpen && (
          <ProductEditModal
            product={selectedProduct}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  );
};



export default ProductsList;
