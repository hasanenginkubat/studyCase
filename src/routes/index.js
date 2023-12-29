const express = require("express");
const users = require("./userRoutes")
const orders = require("./orderRoutes")
const resturant = require("./resturantRoutes")
const review = require("./reviewRoutes")
const router = express.Router();

//tüm rotalarım
router.use(express.json());

router.use("/users", users);
router.use("/resturant", resturant);
router.use("/order", orders);
router.use("/review", review);





module.exports = router;