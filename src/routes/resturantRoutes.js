const express = require('express');
const router = express.Router();
const {
    createRestaurant, 
    createBranchForRestaurant,
    createMenu,
    getRestaurants,
    getRestaurantsByRating
} = require("../controllers/resturantControllers")

router.post("/createResturant", async (req, res) => {
    try {
      const {name, description, logo, address, location, types} = req.body;
      const newResturant = await createRestaurant(name, description, logo, address, location, types);
      if (newResturant.error) {
        return res.status(500).json({ error: newResturant.error });
      }
      return res.status(201).json(newResturant);
    } catch (error) {
      console.log(error)
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.post("/createBranch/:id", async (req, res) => {
    try {
      const { id } = req.params
      const {address, location} = req.body;
      const newResturant = await createBranchForRestaurant(id, address, location);
      if (newResturant.error) {
        return res.status(500).json({ error: newResturant.error });
      }
      return res.status(201).json(newResturant);
    } catch (error) {
      console.log(error)
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post("/createMenu/:restaurantId", async (req, res) => {
    try {
      const { restaurantId } = req.params
      const { name, price, content, coverImage} = req.body;
      const newMenu = await createMenu(restaurantId, name, price, content, coverImage);
      if (newMenu.error) {
        return res.status(500).json({ error: newMenu.error });
      }
      return res.status(201).json(newMenu);
    } catch (error) {
      console.log(error)
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const restaurants = await getRestaurants();

      return res.status(200).json(restaurants);
    } catch (error) {
      console.log(error)
      console.error("Restoran getirme hatası:", error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get("/client", async (req, res) => {
    try {
      const restaurants = await getRestaurantsByRating();

  return res.status(200).json(restaurants);
    } catch (error) {
      console.log(error)
      console.error("Restoran getirme hatası:", error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });


  
  


  module.exports = router