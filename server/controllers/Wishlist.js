import Wishlist from '../models/Wishlist.js';

// Get wishlist by user ID
export const getWishlistByUserId = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      const newWishlist = new Wishlist({ userId, items: [productId] });
      await newWishlist.save();
    } else {
      if (!wishlist.items.includes(productId)) {
        wishlist.items.push(productId);
        await wishlist.save();
      }
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });
    wishlist.items = wishlist.items.filter(item => item.toString() !== productId);
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
