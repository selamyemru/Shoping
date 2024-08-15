import Promotion from '../models/Promotion.js';

// Create a new promotion
export const createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all promotions
export const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get promotion by code
export const getPromotionByCode = async (req, res) => {
  try {
    const promotion = await Promotion.findOne({ code: req.params.code });
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update promotion
export const updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findOneAndUpdate({ code: req.params.code }, req.body, { new: true });
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete promotion
export const deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findOneAndDelete({ code: req.params.code });
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
