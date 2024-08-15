import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cart from '../models/Cart.js';


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  paymentMethods: [{ type: String }],
  status: { type: String, enum: ['active', 'disabled'], default: 'active' }, 
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },

});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Verify password
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, 'your_jwt_secret', { expiresIn: '1h' });
};

export default mongoose.model('User', userSchema);
