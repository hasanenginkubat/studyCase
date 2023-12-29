const mongoose = require("mongoose");
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid');

// id yi ve ilişkileri bu şekilde kullandım çünkü UUID formatına uygun olması gerekiyordu

const UsersSchema = new Schema({
   _id: {
    type: String,
    default: uuidv4,
   },
    fullName: String,
    password: String,
    email: String,
    age: Number,
    gender: String,
    profileImage: String,
    isBanner: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    addresses: [{ type: String }],
    orders: [
      {
        restaurant: String,
        menuItems: [{ type: String }],
        date: Date,
      },
    ],
    comments: [
      {
        restaurant: String,
        comment: String,
        date: Date,
      },
    ],
    ratings: [
      {
        restaurant: String,
        rating: Number,
        date: Date,
      },
    ],


}, {timestamps: true})

const Users = mongoose.model("Users", UsersSchema)
module.exports = Users;