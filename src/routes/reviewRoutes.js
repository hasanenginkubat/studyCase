const express = require('express');
const router = express.Router();
const { createReview } = require('../controllers/reviewControllers');

router.post('/createReview', async (req, res) => {
    const { userId, restaurantId, orderId, comment, rating } = req.body;

    try {
        const review = await createReview(userId, restaurantId, orderId, comment, rating);
        res.status(201).json({ success: true, review });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
