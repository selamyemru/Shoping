

import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

// Admin Dashboard
export const getAdminDashboard = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const userCount = await User.countDocuments();

    res.json({
      productCount,
      orderCount,
      userCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Manage Products
export const manageProduct = async (req, res) => {
  const { id } = req.params;
  const { method } = req;

  try {
    if (method === 'POST') {
      // Create a new product
      const product = new Product(req.body);
      await product.save();
      return res.status(201).json(product);
    }

    if (method === 'PUT') {
      // Update an existing product
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json(product);
    }

    if (method === 'DELETE') {
      // Delete a product
      const product = await Product.findByIdAndDelete(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json({ message: 'Product deleted successfully' });
    }
    
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Manage Orders
export const manageOrder = async (req, res) => {
  const { id } = req.params;
  const { method } = req;

  try {
    if (method === 'GET') {
      // Get all orders
      const orders = await Order.find();
      return res.json(orders);
    }

    if (method === 'PUT') {
      // Update order status
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      if (!order) return res.status(404).json({ message: 'Order not found' });
      return res.json(order);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Manage Users
export const manageUser = async (req, res) => {
  const { id } = req.params;
  const { method } = req;
  const { status } = req.body; // Get status from request body

  try {
    if (method === 'GET') {
      // Get all users
      const users = await User.find();
      return res.json(users);
    }

    if (method === 'PUT') {
      // Update user information
      const updates = { ...req.body };

      // If status is provided in the request, update the status
      if (status) {
        if (['active', 'disabled'].includes(status)) {
          updates.status = status;
        } else {
          return res.status(400).json({ message: 'Invalid status' });
        }
      }

      const user = await User.findByIdAndUpdate(id, updates, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(user);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
