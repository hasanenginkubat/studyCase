const express = require('express');
const router = express.Router();
const {
    createOrder
} = require("../controllers/orderControllers")



router.post("/createOrder", async (req, res) => {
  try {
  const { userId, restaurantId, orderItems, address } = req.body;
  const order = await createOrder(userId, restaurantId, orderItems, address);
  if(order.error){
    return res.status(500).json({ error: order.error });
  }
  res.status(201).json(order)
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  })

module.exports = router;