import express from 'express';
const router = express.Router();

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from  '../controllers/Category.js';

import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/Order.js';

import {
  getCartByUserId,
  addToCart,
  updateCartItem,
  removeFromCart
} from '../controllers/cart.js';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.js';

import {
  createReview,
  getReviewsByProduct,
  getReviewById,
  updateReview,
  deleteReview
} from '../controllers/review.js';
import {
  createPromotion,
  getAllPromotions,
  getPromotionByCode,
  updatePromotion,
  deletePromotion
} from '../controllers/promotion.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword
} from '../controllers/user.js';

import {
  getWishlistByUserId,
  addToWishlist,
  removeFromWishlist
} from '../controllers/wishlist.js';

import { getAdminDashboard, manageProduct, manageOrder, manageUser } from '../controllers/adminController.js';


// Admin dashboard
router.get('/dashboard', getAdminDashboard);

// Manage products
router.post('/products', manageProduct);
router.put('/products/:id', manageProduct);
router.delete('/products/:id', manageProduct);

// Manage orders
router.get('/orders', manageOrder);
router.put('/orders/:id', manageOrder);

// Manage users
router.get('/users', manageUser);
router.put('/users/:id', manageUser);


//category
router.post('/createCategory', createCategory);
router.get('/getAllCategories', getAllCategories);
router.get('/getCategoryById/:id', getCategoryById);
router.put('/updateCategory/:id', updateCategory);
router.delete('/deleteCategory/:id', deleteCategory);

//order

router.post('createOrder/', createOrder);
router.get('/getUserOrders/user/:userId', getUserOrders);
router.get('/getUserOrders/getOrderById/:id', getOrderById);
router.put('/updateOrderStatus/:id/status', updateOrderStatus);
//user
router.get('/getCartByUserId/:userId', getCartByUserId);
router.post('/addToCart/:userId/add', addToCart);
router.put('/updateCartItem/:userId/update', updateCartItem);
router.delete('/removeFromCart/:userId/remove', removeFromCart);
//product
router.post('/addproduct', createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProductById/:id', getProductById);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);


//promotion
router.post('/createPromotion', createPromotion);
router.get('/getAllPromotions', getAllPromotions);
router.get('/getAllPromotions/:code', getPromotionByCode);
router.put('/updatePromotion/:code', updatePromotion);
router.delete('/deletePromotion/:code', deletePromotion);

//review

router.post('/ createReview', createReview);
router.get('/getReviewsByProduct/:productId', getReviewsByProduct);
router.get('/getReviewById/:id', getReviewById);
router.put('/updateReview/:id', updateReview);
router.delete('/deleteReview/:id', deleteReview);

//user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

//wishlist
router.get('/getWishlistByUserId/:userId', getWishlistByUserId);
router.post('/addToWishlist/:userId/add', addToWishlist);
router.delete('/removeFromWishlist/:userId/remove', removeFromWishlist);

export default router;






