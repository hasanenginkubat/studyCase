const Restaurant = require("../models/Resturant");
const Users = require("../models/Users");
const Orders = require("../models/Orders");
const Review = require("../models/Review");

const createReview = async (userId, restaurantId, orderId, comment, rating) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        const user = await Users.findById(userId);

        if (!restaurant || !user) {
            throw new Error("Girilen bilgiler doğru değil. Lütfen tekrar deneyin.");
        }



        const order = await Orders.findById(orderId);
        //Sadece bir kez comment yapılması için kullandığım anahtar
        if (order.isComment) {
            throw new Error("Sadece bir kez yorum yapabilirsiniz.");
        }

        const newReview = new Review({
            userId: userId,
            restaurantId: restaurantId,
            orderId: orderId,
            rating: rating,
            comment: comment,
            reviewDate: new Date(),
        });

        order.isComment = true;

  
        restaurant.ratings.push(rating);

        await Promise.all([order.save(), restaurant.save()]);

        return newReview;
    } catch (error) {
        console.error("İnceleme oluşturma hatası:", error.message);
        throw error;
    }
};

module.exports = {
    createReview
};

module.exports = {
    createReview
};
