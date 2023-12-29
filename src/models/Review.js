const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid');

const reviewSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
   },
  userId: { type: Schema.Types.String, ref: 'Users' },
  restaurantId: { type: Schema.Types.String, ref: 'Restaurant' },
  comment: String,
  rating: {
    type: Number,
    min: 0,
    max: 5
  },  reviewDate: Date,
});

const reviewModel = mongoose.model('Review', reviewSchema);

module.exports = reviewModel;
