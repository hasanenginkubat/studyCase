const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

// id yi ve ilişkileri bu şekilde kullandım çünkü UUID formatına uygun olması gerekiyordu
const menuSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: String,
  price: Number,
  ingredients: String,
  image: String,
  restaurantId: { type: Schema.Types.String,required: true,  ref: 'Restaurant' },
});

const menuModel = mongoose.model('Menu', menuSchema);
module.exports = menuModel;
