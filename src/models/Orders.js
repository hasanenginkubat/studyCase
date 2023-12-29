const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid');


const orderSchema = new Schema({
  // id yi ve ilişkileri bu şekilde kullandım çünkü UUID formatına uygun olması gerekiyordu

  _id: {
    type: String,
    default: uuidv4,
  },
  userId: { type: Schema.Types.String, ref: 'Users' },
  restaurantId: { type: Schema.Types.String, ref: 'Restaurant' },
  items: [
    {
      menuId: { type: Schema.Types.String, ref: 'Menu' },
      quantity: Number,
    },
  ],
  orderAddress: [{ type: String }],
  orderDate: Date,
  orderTime: String,
  isComment: { type: Boolean, default: false },
});


const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;
