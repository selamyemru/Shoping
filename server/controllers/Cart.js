import Cart from '../models/Cart.js';

export const getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId'); // Ensure you populate the product details if needed
    res.json(cart || { items: [] }); // Provide a default structure if no cart is found
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error in addToCart:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update cart item
export const updateCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = cart.items.filter(item => !item.productId.equals(productId));
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
