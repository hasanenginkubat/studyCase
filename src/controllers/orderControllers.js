const Restaurant = require("../models/Resturant")
const Users = require("../models/Users")
const Orders = require("../models/Orders")
const Menu = require("../models/Menu")


const createOrder = async (userId, restaurantId, orderItems, address) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId)

        if(!restaurant){
        throw new Error("Girmiş olduğunuz bilgiler doğru değildir lütfen daha sonra tekrar deneyin.")
        }

        const user = await Users.findById(userId);

        if (!user) {
            throw new Error("Kullanıcı bulunamadı.");
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