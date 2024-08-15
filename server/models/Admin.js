import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Verify password
adminSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token
adminSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, role: this.role }, 'your_jwt_secret', { expiresIn: '1h' });
};

export default mongoose.model('Admin', adminSchema);
