import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Admin from './pages/Admin/Admin';
import Navbar from './Component/Navbar'
import Footer from './pages/Footer';
import CreateProduct from './Component/Product/CreateProduct';
import ProductsList from './Component/Product/ProductsList';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/manageproducts" element={<ProductsList/>} />
        <Route path="/addproduct" element={<CreateProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
