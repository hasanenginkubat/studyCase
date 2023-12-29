const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;
// id yi ve ilişkileri bu şekilde kullandım çünkü UUID formatına uygun olması gerekiyordu

const restaurantSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: String,
  description: String,
  logo: String,
  address: {
    city: String,
    district: String,
    fullAddress: String,
  },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
  branches: [String],
  menu: [{ type: Schema.Types.String, ref: 'Menu' }],
  ratings: {
    type: [{ type: Schema.Types.Number }],

  },
  
     types: [{ type: String }],
});

const Resturant = mongoose.model("Resturant", restaurantSchema);
module.exports = Resturant;
