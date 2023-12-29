const Restaurant = require("../models/Resturant");
const Users = require("../models/Users");
const Orders = require("../models/Orders");
const Review = require("../models/Review");

const createReview = async (userId, restaurantId, orderId, comment, rating) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            throw new Error("Girilen bilgiler doğru değil. Lütfen tekrar deneyin.");
        }

        const user = await Users.findById(userId);

        if (!user) {
            throw new Error("Kullanıcı bulunamadı.");
        }

        const order = await Orders.findById(orderId);

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
