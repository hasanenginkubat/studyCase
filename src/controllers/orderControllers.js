const Restaurant = require("../models/Resturant")
const Users = require("../models/Users")
const Orders = require("../models/Orders")
const Menu = require("../models/Menu")

//Siparişler için yaptığım controllers

const createOrder = async (userId, restaurantId, orderItems, address) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId)
        const user = await Users.findById(userId);

        if(!restaurant || !user){
        throw new Error("Girmiş olduğunuz bilgiler doğru değildir.")
        }

        console.log(user.addresses)

         const newOrder = new Orders({
            userId: userId,
            restaurantId: restaurantId,
            items: orderItems.map(item => ({
                menuId: item.menuId,
                quantity: item.quantity
            })),
            orderAddress: ((user.addresses && user.addresses.length > 0) ? user.addresses.join(', ') : address),
            orderDate: new Date(),
            orderTime: new Date().toLocaleTimeString(),
        });
        

        return await newOrder.save();

    } catch (error) {
        console.error("Sipariş oluşturma hatası:", error.message);
        throw error;
    }
};


module.exports = {
    createOrder
}